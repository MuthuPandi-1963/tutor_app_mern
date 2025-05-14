import UserModel from "../../models/user.js";

const GetTutor = async(req,res)=>{
    try{
        const TutorsList = await UserModel.find({role:"tutor"})
        console.log(TutorsList);
        if(!TutorsList){
            return res.status(404)
            .json({
                success : false,
                message : "No Tutor Found",
                data : {}

            })
        }
        return res.status(200)
        .json({
            success : false,
            message : "Tutor Listed Successfully",
            data : TutorsList

        })
        

    }catch(err){
        console.log(err);
        
    }
}

export default GetTutor;