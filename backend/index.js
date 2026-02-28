import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';
import authRoutes from './auth/auth.routes.js';
import serviceAccount from './serviceAccountKey.json' assert { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

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
        id: uid,
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

app.post('/api/stories', async (req, res) => {
  const { title, description, content, authorId } = req.body;

  if (!authorId) {
    return res.status(400).json({ success: false, error: 'Thiếu authorId (ID tác giả)' });
  }

  try {
    const story = await prisma.story.create({
      data: {
        title: title,
        description: description || '',
        content: content,
        authorId: authorId,
      },
    });

    console.log("✅ Đã tạo Truyện mới:", story.title);
    res.status(201).json({ success: true, story });
  } catch (error) {
    console.error("❌ Lỗi khi lưu Truyện:", error);
    res.status(500).json({ success: false, error: 'Lỗi server khi tạo truyện' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Backend Server đang chạy tại: http://localhost:${PORT}`);
});