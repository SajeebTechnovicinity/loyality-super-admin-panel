import mongoose from 'mongoose';

const notificationModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User',
    },
    counter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'counters',
    },
    message: {
        type: String,
        required: true,
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

export const Notification=mongoose.models.Notification || mongoose.model("Notification",notificationModel)