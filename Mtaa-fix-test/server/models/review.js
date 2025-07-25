import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    reply: {
      type: String,
      trim: true
    },
    reported: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Unique index to ensure 1 review per provider per user
reviewSchema.index({ author: 1, provider: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);