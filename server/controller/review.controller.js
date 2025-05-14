import ReviewModel from "../models/review.js";


// Create a new review
export const createReview = async (req, res) => {
  try {
    const { student, tutor, rating, comment } = req.body;
    const review = new ReviewModel({ student, tutor, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all reviews for a specific tutor
export const getTutorReviews = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const reviews = await ReviewModel.find({ tutor: tutorId }).populate('student', 'name');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a review (optional: by student or admin)
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    await ReviewModel.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
