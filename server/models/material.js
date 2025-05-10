import mongoose, { Schema } from 'mongoose';

const materialSchema = new Schema({
  tutor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  fileUrl: { type: String, required: true }
}, { timestamps: true });

const MaterialModel = mongoose.model("Material", materialSchema);
export default MaterialModel;