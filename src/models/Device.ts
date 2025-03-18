import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
  id: String,
  name: String,
  location: String,
  state: Boolean,
  color: String,
  brightness: Number,
  schedule: {
    date: Date,
    action: {
      action_key: String,
      action_value: String
    }
  }
}, { timestamps: true });

export default mongoose.models.Device || mongoose.model('Device', DeviceSchema); 