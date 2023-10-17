import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const UserModel = mongoose.model('User', userSchema);
