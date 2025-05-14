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
      children: [{ type: Schema.Types.ObjectId, ref: 'user' }], // Parent's linked students
      parent: { type: Schema.Types.ObjectId, ref: 'user' }, // Student's parent
      bio: String, // Tutor
      qualifications: [String], // Tutor
      subjects: [{type:Schema.Types.ObjectId,ref:"subject"}], // Tutor
      hourlyRate: Number, // Tutor
      availability: [{ 
        day: String, // e.g., "Monday"
        startTime: String, // e.g., "09:00"
        endTime: String 
      }], // Tutor
      rating: { type: Number, default: 0 }, // Tutor
      amount :{
        type : Number,
        default : 0
      },
      earnings :{
        type : Number,
        default : 0
      },
      profileUrl :{
        type : String,
        default : "https://static.thenounproject.com/png/4530368-200.png"
      } 
    },{timestamps:true});
  const UserModel = mongoose.model("user",userSchema)

  export default UserModel;