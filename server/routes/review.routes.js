import express from 'express';
import { createReview, deleteReview, getTutorReviews } from '../controller/review.controller.js';


const reviewRoutes = express.Router();

// POST: Create a review
reviewRoutes.post('/create', createReview);

// GET: Get all reviews for a tutor
reviewRoutes.get('/tutor/:tutorId', getTutorReviews);


// DELETE: Delete a review
reviewRoutes.delete('/:reviewId', deleteReview);

export default reviewRoutes;
