import SubjectModel from "../../models/subject.js";

const GetSubjects = async (req, res) => {
    try {
        const subjects = await SubjectModel.find();

        res.status(200).json({
            success: true,
            message: "Subjects fetched successfully",
            data: subjects
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error",
            data: []
        });
    }
};

export default GetSubjects;
