import Joi from "joi";

export const createTaskSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    project_id: Joi.string().required(),
    end_date: Joi.date().optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    status: Joi.string().valid('Pending', 'in_progress', 'done','Approved' ,'rejected').default('Pending'),
    recorde:Joi.string().optional(),
    file:Joi.string().optional(),
    Depatment_id:Joi.string().optional(),
    createdBy: Joi.string().required(),
});

export const updateTaskSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    project_id: Joi.string().optional(),
    end_date: Joi.date().optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    status: Joi.string().valid('Pending', 'in_progress', 'done','Approved' ,'rejected').optional(),
    recorde:Joi.string().optional(),
    file:Joi.string().optional(),
    Depatment_id:Joi.string().optional(),
    createdBy: Joi.string().optional(),
});


