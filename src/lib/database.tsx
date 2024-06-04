import mongoose from 'mongoose';

export async function dbConnect() {
    const db = await mongoose.connect(process.env.MONGO_URI ?? '');
}

export async function dbDisconnect() {
 await mongoose.connection.close();
}
