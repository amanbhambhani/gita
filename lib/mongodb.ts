import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI && process.env.NODE_ENV === 'production' && !process.env.NEXT_PHASE) {
  // Only throw if we're in production and not in the build phase
  // Actually, Next.js build phase can be detected via NEXT_PHASE
  // But for simplicity, let's just log a warning if it's missing during build
}

if (!MONGODB_URI && process.env.NODE_ENV !== 'production') {
   // In dev, we might want to throw
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not defined. Skipping database connection.');
    return null;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance.connection;
    });
  }
  
  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }
  
  return cached!.conn;
}

export default dbConnect;
