import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tutor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dateTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'declined', 'completed'], 
    default: 'pending' 
  },
  meetingLink: String,
  paymentStatus: { type: Boolean, default: false }
}, { timestamps: true });

const BookingModel = mongoose.model("Booking", bookingSchema);
export default BookingModel;