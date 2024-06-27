import mongoose from 'mongoose';

const { Schema } = mongoose;

const LeagueTournamentListSchema = new Schema({
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

const LeagueTournamentList = mongoose.model('LeagueTournamentList', LeagueTournamentListSchema);

export default LeagueTournamentList;