import mongoose from "mongoose";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32); // 32 bytes key
const iv = crypto.randomBytes(16); // unique IV for each document

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), data: encrypted };
}

function decrypt({ iv, data }) {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, "hex"));
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

const reportSchema = new mongoose.Schema({
  name: {
    type: Object, // store {iv, data}
    set: encrypt,
    get: decrypt,
  },
  contactOrEmail: {
    type: Object, // store {iv, data}
    required: true,
    set: encrypt,
    get: decrypt,
  },
  issue: { type: String, required: true },
  description: { type: String, required: true },
  law: { type: String },
  location: { lat: Number, lng: Number },
  mediaUrl: { type: String },
  mediaType: { type: String },
}, { timestamps: true, toJSON: { getters: true }, toObject: { getters: true } });

export default mongoose.models.Report || mongoose.model("Report", reportSchema);
