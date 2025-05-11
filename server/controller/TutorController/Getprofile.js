import UserModel from "../../models/user.js";

export const getTutorProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const tutor = await UserModel.findById(id)
            .populate("subjects", "name description")
            .exec();

        if (!tutor || tutor.role !== "tutor") {
            return res.status(404).json({
                success: false,
                message: "Tutor not found",
                data: {}
            });
        }

        res.status(200).json({
            success: true,
            message: "Tutor profile fetched successfully",
            data: tutor
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