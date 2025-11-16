// middleware/upload.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// مجلد حفظ ملفات المهام
const uploadDir = path.join(__dirname, '../../uploads/tasks');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = [
    'audio/mpeg', 'audio/wav', 'audio/webm', 'audio/ogg',
    'application/pdf', 'image/png', 'image/jpeg', 'application/zip',
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('نوع الملف غير مدعوم. يُسمح بـ: PDF, صور, صوت, ZIP'), false);
  }
};

// تصدير الـ upload مع دعم حقول متعددة
export const uploadTaskFiles = multer({ storage, fileFilter }).fields([
  { name: 'file', maxCount: 1 },     // ملف المهمة
  { name: 'record', maxCount: 1 },   // ملف التسجيل (اختياري)
]);