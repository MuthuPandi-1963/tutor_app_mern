import UserModel from "../../models/user.js";


export const updateTutorProfile = async (req, res) => {
  try {
    const tutorId = req.params.id;
    console.log(req.body);
    
    const { name, bio, qualifications, subjects, availability,hourlyRate ,profileUrl } = req.body;

    const updateFields = {};

    if (name) updateFields.name = name;
    if (bio) updateFields.bio = bio;
    if (qualifications) updateFields.qualifications = qualifications;
    if(hourlyRate) updateFields.hourlyRate = hourlyRate
    if(profileUrl) updateFields.profileUrl = profileUrl

    if (Array.isArray(subjects)) {
      updateFields.subjects = subjects; // assume subjects are strings (names)
    }

    if (Array.isArray(availability)) {
      updateFields.availability = availability;
    }

    const updatedTutor = await UserModel.findByIdAndUpdate(
      tutorId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedTutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    res.status(200).json({ message: "Tutor profile updated", tutor: updatedTutor });
  } catch (error) {
    console.error("Error updating tutor profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
