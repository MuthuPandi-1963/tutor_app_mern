import express from 'express';
import {
  requestStudentLink,
  verifyStudentOTP,
  getParentProfile,
  getChildrenBookings,
  getChildrenReviews,
  getPublicTutors
} from '../controller/parent.controller.js';

const parentRoutes = express.Router();

// Public or semi-protected routes for linking students
parentRoutes.post('/link-request', requestStudentLink);       // Parent initiates student linking
parentRoutes.post('/link-verify', verifyStudentOTP);          // Student verifies OTP

parentRoutes.get('/profile/:id', getParentProfile);               // Parent profile with children
parentRoutes.get('/bookings/:id', getChildrenBookings);           // All bookings by children
parentRoutes.get('/reviews/:id', getChildrenReviews);             // Reviews made by children
parentRoutes.get('/tutors', getPublicTutors);                 // Public tutor list

export default parentRoutes;
