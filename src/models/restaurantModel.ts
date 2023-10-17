import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  idAdmin: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  category: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);
