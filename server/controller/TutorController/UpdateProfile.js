import UserModel from "../../models/user.js";

export const updateTutorProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedTutor = await UserModel.findByIdAndUpdate(
            id,
            {
                ...req.body
            },
            { new: true }
        );

        if (!updatedTutor || updatedTutor.role !== "tutor") {
            return res.status(404).json({
                success: false,
                message: "Tutor not found",
                data: {}
            });
        }

        res.status(200).json({
            success: true,
            message: "Tutor profile updated successfully",
            data: updatedTutor
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