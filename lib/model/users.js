const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
import {Branch} from "@/lib/model/branch";
const userModel = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
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
    device_token: {
        type: String,
        default:null
    },
    access_counter: {
        type: String,
        default:null
    },
    user_type: {
        type: String,
        default: "user", // Default value if not provided
        enum: ["user","employee","branch-admin","brand-admin"], 
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        default:null,
        ref:'Branch',
    },
    img:{
        type: String,
        default:null
    },
    facebook_id:String,
    google_id:String,
    reset_password_code:
    {
        type: String,
        required: false,
    },
    resetPasswordExpires: {
        type: String,
        required: false,
    },
    balance: {
        type: Number,
        default: 0, // Default value if not provided
        get: value => value.toFixed(2), // Convert to string with two decimal places for display
    },
    points: {
        type: Number,
        default: 0, // Default value if not provided
        get: value => value.toFixed(2), // Convert to string with two decimal places for display
    },
    is_notification_on: {
        type: Boolean,
        default: 1, // Default value notification is on
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
userModel.plugin(uniqueValidator);
export const User = mongoose.models.users || mongoose.model("users", userModel)
