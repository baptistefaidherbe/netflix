import mongoose, { Schema, Document, Model } from 'mongoose';

interface IShows extends CartItem, Document {}

const ShowsSchema: Schema = new Schema({
  Id: { type: Number, required: true },
  Title: { type: String, required: true },
  Price: { type: Number, required: true },
  Year: { type: String, required: true },
  Rated: { type: String, required: true },
  Released: { type: String, required: true },
  Runtime: { type: String, required: true },
  Genre: { type: [String], required: true },
  Director: { type: String, required: true },
  Writer: { type: String, required: true },
  Actors: { type: [String], required: true },
  Plot: { type: String, required: true },
  Language: { type: String, required: true },
  Country: { type: String, required: true },
  Awards: { type: String, required: true },
  Metascore: { type: String, required: true },
  imdbRating: { type: String, required: true },
  imdbVotes: { type: String, required: true },
  imdbID: { type: String, required: true },
  Type: { type: String, required: true },
  Response: { type: String, required: true },
  Images: { type: [String], required: true },
  Video: { type: String, required: true },
  isRead: { type: Boolean, required: true },
});

const UserModel: Model<IShows> =
  mongoose.models.shows || mongoose.model<IShows>('shows', ShowsSchema);

export default UserModel;
