"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Tasks_1 = require("../../models/schema/Tasks");
const project_1 = require("../../models/schema/project");
const BadRequest_1 = require("../../Errors/BadRequest");
const NotFound_1 = require("../../Errors/NotFound");
const unauthorizedError_1 = require("../../Errors/unauthorizedError");
const response_1 = require("../../utils/response");
const createTask = async (req, res) => {
    // الـ user جاي من middleware
    const user = req.user;
    if (!user)
        throw new unauthorizedError_1.UnauthorizedError("Access denied. Admins only.");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    const { name, description, project_id, priority, end_date, Department_id, } = req.body;
    if (!name)
        throw new BadRequest_1.BadRequest("Task name is required");
    if (!project_id)
        throw new BadRequest_1.BadRequest("Project ID is required");
    // تأكد أن المشروع موجود
    const project = await project_1.ProjectModel.findById(project_id);
    if (!project)
        throw new NotFound_1.NotFound("Project not found");
    const endDateObj = end_date ? new Date(end_date) : undefined;
    // --------------------------
    //     أهم تعديل هنا 👇
    // --------------------------
    const files = req.files;
    const filePath = files?.file?.[0]?.path || null;
    const recordPath = files?.record?.[0]?.path || null;
    const task = new Tasks_1.TaskModel({
        name,
        description,
        project_id,
        priority,
        end_date: endDateObj,
        Department_id,
        file: filePath,
        record: recordPath,
        createdBy: user._id, // خلي بالك: user مش user._id
    });
    await task.save();
    return (0, response_1.SuccessResponse)(res, {
        message: "Task created successfully",
        task,
    });
};
exports.createTask = createTask;
// جلب كل Tasks
const getAllTasks = async (_req, res) => {
    const tasks = await Tasks_1.TaskModel.find()
        .populate('project_id')
        .populate('Depatment_id')
        .populate('createdBy', 'name email'); // جلب اسم الـ Admin أو الشخص اللي أنشأ المهمة
    (0, response_1.SuccessResponse)(res, { message: 'Tasks fetched successfully', tasks });
};
exports.getAllTasks = getAllTasks;
// جلب Task واحدة
const getTaskById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        throw new BadRequest_1.BadRequest('Invalid Task ID');
    const task = await Tasks_1.TaskModel.findById(id)
        .populate('project_id')
        .populate('Depatment_id')
        .populate('createdBy', 'name email');
    if (!task)
        throw new NotFound_1.NotFound('Task not found');
    (0, response_1.SuccessResponse)(res, { message: 'Task fetched successfully', task });
};
exports.getTaskById = getTaskById;
// تحديث Task (Admin فقط)
const updateTask = async (req, res) => {
    const user = req.user;
    if (!user)
        throw new unauthorizedError_1.UnauthorizedError('Access denied.');
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        throw new BadRequest_1.BadRequest('Invalid Task ID');
    const task = await Tasks_1.TaskModel.findById(id);
    if (!task)
        throw new NotFound_1.NotFound('Task not found');
    // تحديث الحقول
    const updates = req.body;
    if (req.file)
        updates.file = req.file.path; // تحديث الملف
    if (req.body.recorde)
        updates.recorde = req.body.recorde; // تحديث التسجيل
    Object.assign(task, updates);
    await task.save();
    (0, response_1.SuccessResponse)(res, { message: 'Task updated successfully', task });
};
exports.updateTask = updateTask;
// حذف Task (Admin فقط)
const deleteTask = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        throw new BadRequest_1.BadRequest('Invalid Task ID');
    const task = await Tasks_1.TaskModel.findByIdAndDelete(id);
    if (!task)
        throw new NotFound_1.NotFound('Task not found');
    (0, response_1.SuccessResponse)(res, { message: 'Task deleted successfully' });
};
exports.deleteTask = deleteTask;
