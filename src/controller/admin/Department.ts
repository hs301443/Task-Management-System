import { Request,Response } from "express";
import { DepartmentModel } from "../../models/schema/Department";
import { BadRequest } from "../../Errors/BadRequest";
import { NotFound } from "../../Errors/NotFound";
import { SuccessResponse } from "../../utils/response";

export const getAllDepartments = async (req: Request, res: Response) => {
  const departments =  await DepartmentModel.find().lean();
  SuccessResponse(res, { message: "Departments fetched successfully", data: departments });
}
export const getDepartmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new BadRequest("Please provide department id");
    const department = await DepartmentModel.findById(id).lean();   
    if (!department) throw new NotFound("Department not found");
    SuccessResponse(res, { message: "Department fetched successfully", data: department });
}

export const createDepartment = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) throw new BadRequest("Please provide department name");
    const department = await DepartmentModel.create({ name });
    SuccessResponse(res, { message: "Department created successfully", data: department });
}
export const updateDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
    if (!id) throw new BadRequest("Please provide department id");
    const department = await DepartmentModel.findByIdAndUpdate(id
        , { name }, { new: true });
    if (!department) throw new NotFound("Department not found");
    SuccessResponse(res, { message: "Department updated successfully", data: department });
}

export const deleteDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
    if (!id) throw new BadRequest("Please provide department id");
    const department = await DepartmentModel.findByIdAndDelete(id);
    if (!department) throw new NotFound("Department not found");
    SuccessResponse(res, { message: "Department deleted successfully", data: department });
}