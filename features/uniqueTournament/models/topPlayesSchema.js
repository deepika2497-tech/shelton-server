import mongoose from 'mongoose';

const { Schema } = mongoose;

const topPlayersSchema = new mongoose.Schema({
    tournamentId: { type: String, required: true },
    seasons: [{
      seasonId: { type: String, required: true },
      playerStatistics: { type: Array, required: true }
    }]
  });

const TopPlayers = mongoose.model('TopPlayers', topPlayersSchema);

export default TopPlayers;

// export default mongoose.model('TopPlayers', topPlayersSchema);




// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const TournamentSchema = new Schema({
//   tournamentId: {
//     type: String,
//     required: true
//   },
//   data: {
//     type: Array,
//     required: true
//   }
// }, {
//   timestamps: true
// });

// const Tournament = mongoose.model('Tournament', TournamentSchema);

// export default Tournament;