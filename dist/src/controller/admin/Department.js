"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.createDepartment = exports.getDepartmentById = exports.getAllDepartments = void 0;
const Department_1 = require("../../models/schema/Department");
const BadRequest_1 = require("../../Errors/BadRequest");
const NotFound_1 = require("../../Errors/NotFound");
const response_1 = require("../../utils/response");
const getAllDepartments = async (req, res) => {
    const departments = await Department_1.DepartmentModel.find().lean();
    (0, response_1.SuccessResponse)(res, { message: "Departments fetched successfully", data: departments });
};
exports.getAllDepartments = getAllDepartments;
const getDepartmentById = async (req, res) => {
    const { id } = req.params;
    if (!id)
        throw new BadRequest_1.BadRequest("Please provide department id");
    const department = await Department_1.DepartmentModel.findById(id).lean();
    if (!department)
        throw new NotFound_1.NotFound("Department not found");
    (0, response_1.SuccessResponse)(res, { message: "Department fetched successfully", data: department });
};
exports.getDepartmentById = getDepartmentById;
const createDepartment = async (req, res) => {
    const { name } = req.body;
    if (!name)
        throw new BadRequest_1.BadRequest("Please provide department name");
    const department = await Department_1.DepartmentModel.create({ name });
    (0, response_1.SuccessResponse)(res, { message: "Department created successfully", data: department });
};
exports.createDepartment = createDepartment;
const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!id)
        throw new BadRequest_1.BadRequest("Please provide department id");
    const department = await Department_1.DepartmentModel.findByIdAndUpdate(id, { name }, { new: true });
    if (!department)
        throw new NotFound_1.NotFound("Department not found");
    (0, response_1.SuccessResponse)(res, { message: "Department updated successfully", data: department });
};
exports.updateDepartment = updateDepartment;
const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    if (!id)
        throw new BadRequest_1.BadRequest("Please provide department id");
    const department = await Department_1.DepartmentModel.findByIdAndDelete(id);
    if (!department)
        throw new NotFound_1.NotFound("Department not found");
    (0, response_1.SuccessResponse)(res, { message: "Department deleted successfully", data: department });
};
exports.deleteDepartment = deleteDepartment;
