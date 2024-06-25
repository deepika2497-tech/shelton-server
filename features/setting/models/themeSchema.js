import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
  name: String,
  colors: {
    primary: String,
    secondary: String
  }
});

const ThemeModel = mongoose.model('Theme', themeSchema);

export default ThemeModel;