export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.tutor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const validStatus = ['accepted', 'declined', 'completed'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
