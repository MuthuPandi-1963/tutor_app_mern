import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tutor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String
}, { timestamps: true });

const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;