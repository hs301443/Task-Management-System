"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTaskFiles = void 0;
// middleware/upload.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// مجلد حفظ ملفات المهام
const uploadDir = path_1.default.join(__dirname, '../../uploads/tasks');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'audio/mpeg', 'audio/wav', 'audio/webm', 'audio/ogg',
        'application/pdf', 'image/png', 'image/jpeg', 'application/zip',
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('نوع الملف غير مدعوم. يُسمح بـ: PDF, صور, صوت, ZIP'), false);
    }
};
// تصدير الـ upload مع دعم حقول متعددة
exports.uploadTaskFiles = (0, multer_1.default)({ storage, fileFilter }).fields([
    { name: 'file', maxCount: 1 }, // ملف المهمة
    { name: 'record', maxCount: 1 }, // ملف التسجيل (اختياري)
]);
