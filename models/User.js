import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true ,
    isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },


   preferences: {
    theme: { type: String, default: "light" }, // light | dark
    language: { type: String, default: "en" }, // en | hi | mr
    notifications: { type: Boolean, default: true }
  }
}});

export default mongoose.models.User || mongoose.model("User", userSchema);
