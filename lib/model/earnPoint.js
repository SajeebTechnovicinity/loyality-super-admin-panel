import mongoose from 'mongoose';

const earnPointModel = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Order',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User',
    },
    amount: {
        type: Number,
        default: 0, // Default value if not provided
        get: value => value.toFixed(2), // Convert to string with two decimal places for display
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

export const EarnPoint=mongoose.models.EarnPoint || mongoose.model("EarnPoint",earnPointModel)