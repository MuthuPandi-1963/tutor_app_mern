import mongoose, {Schema} from 'mongoose'
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['student', 'parent', 'tutor', 'admin'], 
      required: true 
    },
    otp:{
        type:String,
        default:""
    },
    otpExpiry:{
        type : Date,
        default : Date.now()
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    
    // Role-specific fields
    children: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Parent's linked students
    parent: { type: Schema.Types.ObjectId, ref: 'User' }, // Student's parent
    bio: String, // Tutor
    qualifications: [String], // Tutor
    subjects: [String], // Tutor
    hourlyRate: Number, // Tutor
    availability: [{ 
      day: String, // e.g., "Monday"
      startTime: String, // e.g., "09:00"
      endTime: String 
    }], // Tutor
    rating: { type: Number, default: 0 } // Tutor
  },{timestamps:true});
const UserModel = mongoose.model("user",userSchema)

export default UserModel;