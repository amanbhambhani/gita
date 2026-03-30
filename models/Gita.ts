import mongoose, { Document } from 'mongoose';

export interface IGita extends Document {
  chapter: number;
  shlok: number;
  sanskrit: string;
  hindi: string;
  english: string;
  meaning: string;
  tags: string[];
}

const GitaSchema = new mongoose.Schema({
  chapter: { type: Number, required: true },
  shlok: { type: Number, required: true },
  sanskrit: { type: String, required: true },
  hindi: { type: String, required: true },
  english: { type: String, required: true },
  meaning: { type: String, required: true },
  tags: [{ type: String }], // For matching
});

export default mongoose.models.Gita || mongoose.model<IGita>('Gita', GitaSchema);
