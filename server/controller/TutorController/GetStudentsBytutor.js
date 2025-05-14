import BookingModel from "../../models/booking.js";


const getStudentsByTutor = async (req,res) => {
  try {
    const { tutorId } = req.params;

    const bookings = await BookingModel.find({ tutor: tutorId })
      .populate('student', 'name email profileUrl') // populate selected student fields
      .exec();

    // Extract unique students
    const studentsMap = new Map();
    bookings.forEach(booking => {
      if (booking.student) {
        studentsMap.set(booking.student._id.toString(), booking.student);
      }
    });

    const uniqueStudents = Array.from(studentsMap.values());
    return res.status(200)
    .json({
        message:"fetched Student Details Successfully",
        success: true,
        data : uniqueStudents
    });

  } catch (error) {
    return res.status(500)
    .json({
        message:error.message,
        success: false,
        data : {}
    });
  }
};
export default getStudentsByTutor;