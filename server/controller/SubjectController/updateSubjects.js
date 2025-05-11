import SubjectModel from "../../models/subject.js";

const UpdateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, material, image } = req.body;

        const updatedSubject = await SubjectModel.findByIdAndUpdate(
            id,
            {
                ...(name && { name }),
                ...(description && { description }),
                ...(material && { material }),
                ...(image && { image }),
            },
            { new: true } // return the updated document
        );

        if (!updatedSubject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found",
                data: {}
            });
        }

        res.status(200).json({
            success: true,
            message: "Subject updated successfully",
            data: updatedSubject
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error",
            data: {}
        });
    }
};

export default UpdateSubject;
