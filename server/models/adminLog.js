const adminLogSchema = new Schema({
    admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    targetModel: String,
    targetId: Schema.Types.ObjectId,
    description: String
  }, { timestamps: true });
  
  const AdminLogModel = mongoose.model('AdminLog', adminLogSchema);
  export default AdminLogModel; 