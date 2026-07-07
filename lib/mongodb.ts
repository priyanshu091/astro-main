import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  // We'll throw an error if the user hasn't set this up yet, 
  // but they'll need to know to set it in .env
  console.warn('Missing environment variable: "MONGODB_URI". Please set it in .env');
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/astro_cache";
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
