import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const otpStore = new Map();

// Cấu hình Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendRegistrationOtp = async (req, res) => {
  const { email, fullName, password } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ success: false, error: 'Vui lòng nhập đủ thông tin' });
  }

  try {
    // 1. Kiểm tra email đã tồn tại trên Firebase chưa
    try {
      await admin.auth().getUserByEmail(email);
      return res.status(400).json({ success: false, error: 'Email này đã được đăng ký' });
    } catch (error) {
      if (error.code !== 'auth/user-not-found') throw error;
    }

    // 2. Tạo mã OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Lưu OTP vào bộ nhớ (Hết hạn sau 5 phút)
    otpStore.set(email, {
      otp,
      fullName,
      password,
      expiresAt: Date.now() + 5 * 60 * 1000 
    });

    // 4. Gửi Email thật bằng Nodemailer
    const mailOptions = {
      from: `"DreamScribe AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Mã xác thực đăng ký tài khoản DreamScribe',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #f8fafc;">
          <h2 style="color: #9333ea; text-align: center;">Chào mừng đến với DreamScribe!</h2>
          <p style="color: #334155; font-size: 16px;">Chào <strong>${fullName}</strong>,</p>
          <p style="color: #334155; font-size: 16px;">Bạn đang thực hiện đăng ký tài khoản tại DreamScribe. Dưới đây là mã xác thực OTP của bạn (mã có hiệu lực trong 5 phút):</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #a855f7; letter-spacing: 5px; background-color: #f3e8ff; padding: 10px 20px; border-radius: 8px;">
              ${otp}
            </span>
          </div>
          
          <p style="color: #64748b; font-size: 14px;">Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
          <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 20px 0;" />
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">© 2026 DreamScribe. Nền tảng sáng tạo truyện cùng AI.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Đã gửi email OTP thực tế tới: ${email}`);

    res.status(200).json({ success: true, message: 'Đã gửi mã OTP vào email của bạn' });

  } catch (error) {
    console.error("❌ Lỗi khi gửi OTP:", error);
    res.status(500).json({ success: false, error: 'Lỗi hệ thống khi gửi email OTP. Hãy kiểm tra lại cấu hình mail.' });
  }
};

export const verifyOtpAndRegister = async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);

  if (!record || record.expiresAt < Date.now()) {
    return res.status(400).json({ success: false, error: 'Mã OTP đã hết hạn hoặc không tồn tại' });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ success: false, error: 'Mã OTP không chính xác' });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: record.password,
      displayName: record.fullName,
    });

    const user = await prisma.user.create({
      data: {
        id: userRecord.uid,
        email: email,
        displayName: record.fullName,
        provider: 'password',
      }
    });

    otpStore.delete(email);
    console.log("✅ Đã xác thực OTP & tạo tài khoản thành công:", email);

    res.status(201).json({ success: true, message: 'Đăng ký thành công', user });

  } catch (error) {
    console.error("❌ Lỗi khi tạo User:", error);
    res.status(500).json({ success: false, error: 'Lỗi khi tạo tài khoản' });
  }
};