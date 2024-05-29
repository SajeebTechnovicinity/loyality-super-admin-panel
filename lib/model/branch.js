import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const branchModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
    },
    info: {
        type: String,
    },
    public_key: {
        type: String,
    },
    screct_key: {
        type: String,
    },
    encryption_key: {
        type: String,
    },
    payment_crediantial_status: {
        type: Number,
        default: 0, // Default value if not provided
        enum: [0, 1], // Example: Only allow values  1=active, or 0=inactive
    },
    testing_mode: {
        type: Boolean,
        default: 1, // Default value is set to 1 means test mode on
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
branchModel.plugin(uniqueValidator);
export const Branch = mongoose.models.Branch || mongoose.model("Branch", branchModel)