import express from 'express';
import { createPayment, getAllPayments, getPaymentByBooking, updatePaymentStatus } from '../controller/payment.controller.js';


const paymentRoutes = express.Router();

paymentRoutes.post('/create', createPayment);                   // Create payment
paymentRoutes.get('/', getAllPayments);                         // Get all payments
paymentRoutes.get('/booking/:bookingId', getPaymentByBooking);  // Get payment by booking
paymentRoutes.put('/status', updatePaymentStatus);              // Update status

export default paymentRoutes;
