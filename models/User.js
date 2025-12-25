import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true , trim:true,},
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  password: { type: String, required: true ,},

  isDeleted: { type: Boolean, default: false ,},
  deletedAt: { type: Date , },

  lastProfileUpdateAt: {
    type: Date,
    default: null,},
    
    preferences: {
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
  },

  },    {timestamps: true,}
);

export default mongoose.models.User || mongoose.model("User", userSchema);
