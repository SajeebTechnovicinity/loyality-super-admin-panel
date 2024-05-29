import mongoose from 'mongoose';

const employeeAssignCounterModel = new mongoose.Schema({
    counter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'counters',
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User',
    },
    details: {
        type: String,
    },
    assign_date_time: {
        type: Date,
    },
    assign_out_date_time: {
        type: Date,
    },
    status: {
        type: Number,
        default: 1, // Default value if not provided
        enum: [0, 1], // Example: Only allow values  1=active, or 0=inactive
    },
    is_delete: {
        type: Boolean,
        default: 0, // Default value is set to 0
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export const EmployeeAssignCounter=mongoose.models.EmployeeAssignCounter || mongoose.model("EmployeeAssignCounter",employeeAssignCounterModel)