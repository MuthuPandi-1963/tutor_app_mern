import mongoose, { Schema } from 'mongoose';

const paymentSchema = new Schema({
  booking: { type: Schema.Types.ObjectId, ref: 'booking', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['stripe', 'paypal'], required: true },
  transactionId: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed', 'refunded'], 
    default: 'pending' 
  },
  tutorEarnings: { type: Number }
}, { timestamps: true });

const PaymentModel = mongoose.model("payment", paymentSchema);
export default PaymentModel;