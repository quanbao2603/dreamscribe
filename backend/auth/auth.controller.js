import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';

const prisma = new PrismaClient();

export const verifyFirebaseUser = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ success: false, error: 'Thiếu idToken từ Frontend' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    const { uid, email, name, picture } = decodedToken;

    const user = await prisma.user.upsert({
      where: { email: email },
      update: {
        displayName: name,
        photoURL: picture,
      },
      create: {
        id: uid, 
        email: email,
        displayName: name || 'User ẩn danh',
        photoURL: picture || '',
      },
    });

    console.log("✅ Đã xác thực và lưu DB cho:", user.email);
    
    res.status(200).json({ success: true, user });
    
  } catch (error) {
    console.error("❌ Lỗi xác thực Firebase:", error);
    res.status(401).json({ success: false, error: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};