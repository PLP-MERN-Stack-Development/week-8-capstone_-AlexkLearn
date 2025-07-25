import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      unique: true,
      sparse: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'provider', 'admin'],
      default: 'user'
    },
    providerProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);