import mongoose from "mongoose";

type ConnectionCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as {
  portfolioMongoose?: ConnectionCache;
};

const cache: ConnectionCache =
  globalForMongoose.portfolioMongoose ?? { conn: null, promise: null };

globalForMongoose.portfolioMongoose = cache;

export default async function connectDb() {
  if (cache.conn) return cache.conn;

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (!cache.promise) {
    mongoose.set("strictQuery", true);
    cache.promise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME || "myPortfolio",
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }

  return cache.conn;
}
