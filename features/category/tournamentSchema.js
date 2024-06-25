import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
  tournaments: [Object]
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;