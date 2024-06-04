import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  img?: string;
}

const UsersSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

const UserModel: Model<IUser> =
  mongoose.models.users || mongoose.model<IUser>('users', UsersSchema);

export default UserModel;
