import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  tutor: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String
}, { timestamps: true });

const ReviewModel = mongoose.model("review", reviewSchema);
export default ReviewModel;