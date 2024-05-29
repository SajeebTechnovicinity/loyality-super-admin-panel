import mongoose, {mongo} from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const counterModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Branch',
    },
    counter_no: {
        type: String,
    },
    info: {
        type: String,
    },
    status: {
        type: Number,
        default: 1, // Default value if not provided
        enum: [0, 1], // Example: Only allow values  1=available, or 0=unavailable
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
counterModel.plugin(uniqueValidator);
export const Counter = mongoose.models.counters || mongoose.model("counters", counterModel)