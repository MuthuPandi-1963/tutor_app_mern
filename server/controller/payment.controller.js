import BookingModel from "../models/booking.js";
import PaymentModel from "../models/payment.js";


// Create Payment
export const createPayment = async (req, res) => {
  try {
    const { booking, amount, method, transactionId, tutorEarnings } = req.body;

    const payment = new PaymentModel({
      booking,
      amount,
      method,
      transactionId,
      tutorEarnings
    });

    await payment.save();

    // Optionally update the booking payment status
    await BookingModel.findByIdAndUpdate(booking, { paymentStatus: true });

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentModel.find().populate('booking');
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get payment by booking ID
export const getPaymentByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const payment = await PaymentModel.findOne({ booking: bookingId }).populate('booking');
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId, status } = req.body;
    const payment = await PaymentModel.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true }
    );
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
