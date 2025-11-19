"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    projectId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Project', required: true },
    start_date: { type: Date },
    end_date: { type: Date },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    status: {
        type: String,
        enum: ['Pending', 'in_progress', 'done', 'Approved', 'rejected'],
        default: 'Pending',
    },
    recorde: { type: String, default: '' },
    file: { type: String, default: '' },
    Depatment_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Department' },
    depends_on: [
        {
            user_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            is_done: {
                type: Boolean,
                default: false,
            },
        },
    ],
}, {
    timestamps: true,
});
exports.TaskModel = (0, mongoose_1.model)('Task', taskSchema);
