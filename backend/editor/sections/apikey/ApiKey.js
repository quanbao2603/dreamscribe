import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveApiKey = async (req, res) => {
  try {
    const { userId, agent, role, name, key } = req.body;


    if (!userId || !agent || !role || !name || !key) {
      return res.status(400).json({ success: false, error: 'Vui lòng điền đầy đủ thông tin' });
    }

 
    const newApiKey = await prisma.apiKey.create({
      data: {
        userId: userId,
        agent: agent,
        role: role,
        name: name,
        key: key
      }
    });

    return res.status(201).json({ 
      success: true, 
      message: 'Lưu cấu hình API Key thành công!',
      data: newApiKey 
    });

  } catch (error) {
    console.error("❌ Lỗi khi lưu API Key:", error);
    return res.status(500).json({ success: false, error: 'Lỗi máy chủ khi lưu cấu hình' });
  }
};


export const getApiKeys = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'Thiếu thông tin người dùng' });
    }

    const keys = await prisma.apiKey.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' } // Sắp xếp key mới tạo lên đầu
    });

    return res.status(200).json({ success: true, data: keys });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách API Key:", error);
    return res.status(500).json({ success: false, error: 'Lỗi máy chủ khi tải dữ liệu' });
  }
};