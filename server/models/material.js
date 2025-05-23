import mongoose, { Schema } from 'mongoose';

const materialSchema = new Schema({
  tutor: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  title: { type: String, required: true },
  description: String,
  fileUrl: { type: String, required: true }
}, { timestamps: true });

const MaterialModel = mongoose.model("material", materialSchema);
export default MaterialModel;