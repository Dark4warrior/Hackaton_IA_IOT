import mongoose from "mongoose";

export interface Tests extends mongoose.Document {
  name: string;
}

const TestSchema = new mongoose.Schema<Tests>({
  name: {
    type: String,
    required: [true, "Please provide a name for this pet."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
});

export default mongoose.models.Test || mongoose.model<Tests>("Test", TestSchema);
