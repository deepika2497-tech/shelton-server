import mongoose from 'mongoose';

const EventCountSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
  timezoneOffset: {
    type: String,
    required: true,
  },
});

const EventCount = mongoose.model('EventCount', EventCountSchema);

export default EventCount;