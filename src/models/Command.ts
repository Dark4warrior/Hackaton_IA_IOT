import mongoose from 'mongoose';

const CommandSchema = new mongoose.Schema({
  id: String,
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
  action: {
    action_key: String,
    action_value: String
  }
}, { timestamps: true });

export default mongoose.models.Command || mongoose.model('Command', CommandSchema); 