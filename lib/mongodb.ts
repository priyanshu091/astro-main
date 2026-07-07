import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Missing environment variable: "MONGODB_URI"');
}

// Use a module-level cached promise so the connection is reused across
// invocations in the same serverless instance (warm starts)
let clientPromise: Promise<MongoClient>;

declare global {
  // Allow global reuse in development (hot reload)
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production / serverless, create a new client per module load.
  // Vercel freezes the module between requests so this IS reused on warm starts.
  const client = new MongoClient(uri, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 1, // Keep it small for serverless
  });
  clientPromise = client.connect();
}

export default clientPromise;
