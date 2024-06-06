import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
  purchaseTime: { type: Date, required: true },
});

export default mongoose.models.Purchase || mongoose.model('Purchase', PurchaseSchema);
