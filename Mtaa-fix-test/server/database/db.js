import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`✅ MongoDB Connected in ${NODE_ENV}`);

  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    throw error;
  }
  
};

export default connectDB;