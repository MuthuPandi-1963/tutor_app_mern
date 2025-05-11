import UserModel from "../../models/user.js";

// ✅ Create Tutor Profile
export const createTutorProfile = async (req, res) => {
    try {
        const { id } = req.params; // user id from route
        const {
            bio,
            qualifications,
            subjects,
            hourlyRate,
            availability
        } = req.body;

        const user = await UserModel.findById(id);
        if (!user || user.role !== "tutor") {
            return res.status(404).json({
                success: false,
                message: "Tutor not found",
                data: {}
            });
        }

        // Update tutor-specific fields
        user.bio = bio || user.bio;
        user.qualifications = qualifications || user.qualifications;
        user.subjects = subjects || user.subjects;
        user.hourlyRate = hourlyRate || user.hourlyRate;
        user.availability = availability || user.availability;

        await user.save();

        res.status(201).json({
            success: true,
            message: "Tutor profile created successfully",
            data: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message,
            data: {}
        });
    }
};
