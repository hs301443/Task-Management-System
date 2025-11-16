import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { TaskModel } from '../../models/schema/Tasks';
import { ProjectModel } from '../../models/schema/project';
import { BadRequest } from '../../Errors/BadRequest';
import { NotFound } from '../../Errors/NotFound';
import { UnauthorizedError } from '../../Errors/unauthorizedError';
import { SuccessResponse } from '../../utils/response';


export const createTask = async (req: Request, res: Response) => {
  // الـ user جاي من middleware
  const user = req.user;
  if (!user) throw new UnauthorizedError("Access denied. Admins only.");

  console.log("BODY:", req.body);
  console.log("FILES:", req.files);

  const {
    name,
    description,
    project_id,
    priority,
    end_date,
    Department_id,
  } = req.body;

  if (!name) throw new BadRequest("Task name is required");
  if (!project_id) throw new BadRequest("Project ID is required");

  // تأكد أن المشروع موجود
  const project = await ProjectModel.findById(project_id);
  if (!project) throw new NotFound("Project not found");

  const endDateObj = end_date ? new Date(end_date) : undefined;

  // --------------------------
  //     أهم تعديل هنا 👇
  // --------------------------
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const filePath = files?.file?.[0]?.path || null;
  const recordPath = files?.record?.[0]?.path || null;

  const task = new TaskModel({
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

  return SuccessResponse(res, {
    message: "Task created successfully",
    task,
  });
};


// جلب كل Tasks
export const getAllTasks = async (_req: Request, res: Response) => {
    const tasks = await TaskModel.find()
      .populate('project_id')
      .populate('Depatment_id')
      .populate('createdBy', 'name email'); // جلب اسم الـ Admin أو الشخص اللي أنشأ المهمة

 SuccessResponse(res,{message:'Tasks fetched successfully', tasks});

};

// جلب Task واحدة
export const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Task ID');

    const task = await TaskModel.findById(id)
      .populate('project_id')
      .populate('Depatment_id')
      .populate('createdBy', 'name email');

    if (!task) throw new NotFound('Task not found');

     SuccessResponse(res,{message:'Task fetched successfully', task});

};

// تحديث Task (Admin فقط)
export const updateTask = async (req: Request, res: Response) => {
  const user = req.user;
    if(!user) throw new UnauthorizedError('Access denied.');
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Task ID');

    const task = await TaskModel.findById(id);
    if (!task) throw new NotFound('Task not found');

    // تحديث الحقول
    const updates = req.body;
    if (req.file) updates.file = req.file.path;       // تحديث الملف
    if (req.body.recorde) updates.recorde = req.body.recorde; // تحديث التسجيل

    Object.assign(task, updates);
    await task.save();

     SuccessResponse(res,{message:'Task updated successfully', task});

 
};

// حذف Task (Admin فقط)
export const deleteTask = async (req: Request, res: Response) => {
  const user = req.user;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Task ID');

    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) throw new NotFound('Task not found');

     SuccessResponse(res,{message:'Task deleted successfully'});

};

