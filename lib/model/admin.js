const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const adminModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    branch_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'branches',
        required: false,
    },
    access_counter:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: String,
    user_type: {
        type: Number,
        required: true,
        enum: [1, 2, 3], // 3=shop admin 2=branch manager 1=employ counter
    },
    facebook_id: String,
    google_id: String,
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
adminModel.plugin(uniqueValidator)

export const Admin = mongoose.models.admins || mongoose.model("admins", adminModel)
