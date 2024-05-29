import mongoose from "mongoose";

function date() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
const orderModel = new mongoose.Schema({
  counter: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "counters",
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Branch",
  },
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  wallet_amount: {
    type: Number,
    default: 0, // Default value if not provided
    get: (value) => value.toFixed(2), // Convert to string with two decimal places for display
  },
  gateway_amount: {
    type: Number,
    default: 0, // Default value if not provided
    get: (value) => value.toFixed(2), // Convert to string with two decimal places for display
  },
  total_amount: {
    type: Number,
    default: 0, // Default value if not provided
    get: (value) => value.toFixed(2), // Convert to string with two decimal places for display
  },
  currency: {
    type: String,
    required: true,
  },
  tran_id: {
    type: String,
    required: false,
  },
  tran_ref: {
    type: String,
    required: false,
  },
  payment_type: {
    type: String,
    required: true,
  },
  payment_date: {
      type: String,
      default:date(),
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
export const Order =
  mongoose.models.Order || mongoose.model("Order", orderModel);
