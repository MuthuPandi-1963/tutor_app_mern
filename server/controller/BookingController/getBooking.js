export const getBookings = async (req, res) => {
    try {
      const userId = req.user.id;
      const bookings = await Booking.find({
        $or: [{ student: userId }, { tutor: userId }]
      })
      .populate('student', 'name email')
      .populate('tutor', 'name email')
      .sort('-dateTime');
  
      res.json(bookings);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };