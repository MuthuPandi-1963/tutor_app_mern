import SubjectModel from "../../models/subject.js";

const CreateSubjects = async (req,res)=>{
    try{
        console.log(req.body);
        
        const {name,description,material,image} = req.body
        if(!name || !description){
            return res.status(404)
            .json({
                success : false,
                message : "Data not found",
                data : {}
            })
        }
        const newSubject =await  SubjectModel.create({
            name,
            description,
            image,
            material : material || ""
        })
        res.status(200)
        .json({
            success : true,
            message : "Subject added Successfully" ,
            data : newSubject
        })
    }catch(err){
        console.log(err);
        res.status(err)
        .json({
            success: false,
            message : err.message,
            data : {}
        })
        
    }
}

export default CreateSubjects;