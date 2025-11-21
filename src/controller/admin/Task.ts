import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { TaskModel } from '../../models/schema/Tasks';
import { ProjectModel } from '../../models/schema/project';
import { UserProjectModel } from '../../models/schema/User_Project';
import { BadRequest } from '../../Errors/BadRequest';
import { NotFound } from '../../Errors/NotFound';
import { UnauthorizedError } from '../../Errors/unauthorizedError';
import { SuccessResponse } from '../../utils/response';

// --------------------------
// CREATE TASK
// --------------------------
export const createTask = async (req: Request, res: Response) => {
  const user = req.user?._id;
  if (!user) throw new UnauthorizedError("Access denied.");

  const { name, description, projectId, priority, end_date, Depatment_id } = req.body;

  if (!name) throw new BadRequest("Task name is required");
  if (!projectId) throw new BadRequest("Project ID is required");

  // تأكد أن المشروع موجود
  const project = await ProjectModel.findById(projectId);
  if (!project) throw new NotFound("Project not found");

  // تحقق صلاحية المستخدم في المشروع
  const checkuseratproject = await UserProjectModel.findOne({ 
    user_id: user, 
    project_id: projectId 
  });

  const role = req.user?.role?.toLowerCase();
  if (role !== "admin") {
    const userProjectRole = checkuseratproject?.role?.toLowerCase() ?? '';
    if (!checkuseratproject || ["member", "membercanapprove"].includes(userProjectRole)) {
      throw new UnauthorizedError("You can't create a task for this project");
    }
  }

  const endDateObj = end_date ? new Date(end_date) : undefined;

  // التعامل مع الملفات
  const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
  const filePath = files?.file?.[0]?.path || null;
  const recordPath = files?.recorde?.[0]?.path || null;

  const task = new TaskModel({
    name,
    description,
    projectId: new Types.ObjectId(projectId),
    priority,
    end_date: endDateObj,
    Depatment_id: Depatment_id ? new Types.ObjectId(Depatment_id) : undefined,
    file: filePath,
    recorde: recordPath,
    createdBy: user,
  });

  await task.save();

  const protocol = req.protocol;
  const host = req.get("host");

  const fileUrl = task.file ? `${protocol}://${host}/${task.file.replace(/\\/g, "/")}` : null;
  const recordUrl = task.recorde ? `${protocol}://${host}/${task.recorde.replace(/\\/g, "/")}` : null;

  SuccessResponse(res, {
    message: 'Task created successfully',
    task: { ...task.toObject(), file: fileUrl, recorde: recordUrl }
  });
};

// --------------------------
// GET ALL TASKS
// --------------------------
export const getAllTasks = async (_req: Request, res: Response) => {
  const user = _req.user?._id;
  if(!user) throw new UnauthorizedError('Access denied.');

  const checkuseratproject = await UserProjectModel.findOne({ user_id: user });

  const role = _req.user?.role?.toLowerCase();
  if (role !== "admin") {
    const userProjectRole = checkuseratproject?.role?.toLowerCase() ?? '';
    if (!checkuseratproject || ["member", "membercanapprove"].includes(userProjectRole)) {
      throw new UnauthorizedError("You can't view tasks for this project");
    }
  }

  const tasks = await TaskModel.find()
    .populate('projectId')       // بدل project_id
    .populate('Depatment_id')    // بدل Depatment_id
    .populate('createdBy', 'name email'); // بدل createdBy

  SuccessResponse(res, { message: 'Tasks fetched successfully', tasks });
};

// --------------------------
// GET TASK BY ID
// --------------------------
export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Task ID');

  const task = await TaskModel.findById(id)
    .populate('projectId')       // بدل project_id
    .populate('Depatment_id')    // بدل Depatment_id
    .populate('createdBy', 'name email'); // بدل createdBy

  if (!task) throw new NotFound('Task not found');

  SuccessResponse(res, { message: 'Task fetched successfully', task });
};

// --------------------------
// UPDATE TASK
// --------------------------
export const updateTask = async (req: Request, res: Response) => {
  const user = req.user;
  if(!user) throw new UnauthorizedError('Access denied.');

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Task ID');

  const task = await TaskModel.findById(id);
  if (!task) throw new NotFound('Task not found');

  // تحديث الحقول
  const updates = req.body;
  if (req.file) updates.file = req.file.path;
  if (req.body.recorde) updates.recorde = req.body.recorde;

  Object.assign(task, updates);
  await task.save();

  SuccessResponse(res, { message:'Task updated successfully', task });
};

// --------------------------
// DELETE TASK
// --------------------------
export const deleteTask = async (req: Request, res: Response) => {
  const user = req.user;
  if(!user) throw new UnauthorizedError('Access denied.');

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Task ID');

  const task = await TaskModel.findByIdAndDelete(id);
  if (!task) throw new NotFound('Task not found');

  SuccessResponse(res, { message:'Task deleted successfully' });
};
