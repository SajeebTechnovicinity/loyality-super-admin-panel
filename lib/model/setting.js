import mongoose from 'mongoose';
const settingModel = new mongoose.Schema({
    app_name: {
        type: String,
        required: true,
    },
    app_logo: {
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
export const Setting = mongoose.models.Setting || mongoose.model("Setting", settingModel)