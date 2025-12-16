import mongoose from "mongoose";

const archivedUserSchema = new mongoose.Schema({
  originalUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: String,
  email: String,
  reason: String,
  deletedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Archeiveduser ||
  mongoose.model("Archeiveduser", archivedUserSchema);
