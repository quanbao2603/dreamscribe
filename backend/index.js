import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
// Khởi tạo Prisma để tương tác với cơ sở dữ liệu Supabase
const prisma = new PrismaClient();

// Cấu hình Middleware
app.use(cors()); // Cho phép Frontend gọi API mà không bị chặn lỗi CORS
app.use(express.json()); // Cho phép Express đọc dữ liệu JSON gửi lên từ Frontend

// ==========================================
// API 1: ĐỒNG BỘ DỮ LIỆU USER TỪ FIREBASE
// ==========================================
app.post('/api/users/sync', async (req, res) => {
  const { uid, email, displayName, photoURL } = req.body;

  try {
    const user = await prisma.user.upsert({
      where: { email: email },
      update: {
        displayName: displayName,
        photoURL: photoURL,
      },
      create: {
        id: uid, // Dùng UID của Firebase làm ID chính
        email: email,
        displayName: displayName || 'User ẩn danh',
        photoURL: photoURL || '',
      },
    });

    console.log("✅ Đã đồng bộ User:", user.email);
    res.status(200).json({ success: true, user });
    
  } catch (error) {
    console.error("❌ Lỗi khi lưu User:", error);
    res.status(500).json({ success: false, error: 'Lỗi server khi đồng bộ user' });
  }
});

// ==========================================
// API 2: TẠO TRUYỆN MỚI
// ==========================================
app.post('/api/stories', async (req, res) => {
  const { title, description, content, authorId } = req.body;

  // Kiểm tra xem dữ liệu gửi lên có thiếu tác giả không
  if (!authorId) {
    return res.status(400).json({ success: false, error: 'Thiếu authorId (ID tác giả)' });
  }

  try {
    const story = await prisma.story.create({
      data: {
        title: title,
        description: description || '',
        content: content,
        authorId: authorId, // Chú ý: ID này phải tồn tại trong bảng User
      },
    });

    console.log("✅ Đã tạo Truyện mới:", story.title);
    res.status(201).json({ success: true, story });
    
  } catch (error) {
    console.error("❌ Lỗi khi lưu Truyện:", error);
    res.status(500).json({ success: false, error: 'Lỗi server khi tạo truyện' });
  }
});

// ==========================================
// KHỞI ĐỘNG SERVER
// ==========================================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Backend Server đang chạy tại: http://localhost:${PORT}`);
});