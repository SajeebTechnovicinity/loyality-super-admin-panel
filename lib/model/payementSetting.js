import mongoose from 'mongoose';
const paymentSettingModel = new mongoose.Schema({
    branch_receive: {
        type: Number,
        default: 0, // Default value if not provided
        required: true,
    },
    technovicinity_receive: {
        type: Number,
        default: 0, // Default value if not provided
        required: true,
    },
    money_to_points: {
        type: Number,
        required: true,
    },
    points_to_money: {
        type: Number,
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
export const PaymentSetting = mongoose.models.PaymentSetting || mongoose.model("PaymentSetting", paymentSettingModel)