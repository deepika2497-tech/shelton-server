import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  sport: { type: String, required: true, unique: true },
  data: { type: Array, required: true },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;