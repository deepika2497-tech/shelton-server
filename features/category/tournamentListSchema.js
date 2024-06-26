import mongoose from 'mongoose';

const { Schema } = mongoose;

const TournamentListSchema = new Schema({
  categoryId: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
});

const TournamentList = mongoose.model('TournamentList', TournamentListSchema);

export default TournamentList;