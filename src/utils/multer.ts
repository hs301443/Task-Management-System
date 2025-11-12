import multer from 'multer';
import path from 'path';
import fs from 'fs';

// 📁 تحديد مكان الحفظ
const uploadDir = path.join(__dirname, '../../uploads/tasks');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📦 إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// 🧠 فلترة الملفات (صوت / ملف عام)
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = [
    'audio/mpeg', 'audio/wav', 'audio/webm', 'audio/ogg',
    'application/pdf', 'image/png', 'image/jpeg', 'application/zip',
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

export const upload = multer({ storage, fileFilter });
