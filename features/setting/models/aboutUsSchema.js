import mongoose from 'mongoose';

const aboutUsSchema = new mongoose.Schema({
    content: String,
});

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

export default AboutUs;