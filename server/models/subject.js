import mongoose from 'mongoose'

const SubjectSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    image : {
        type:String,
        default : ""
    },
    material : {type : String}
},{timestamps:true})

const SubjectModel = mongoose.model("subject",SubjectSchema)
export default SubjectModel;