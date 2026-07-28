import { MongoClient } from "mongodb";

/**
 * Lazily-created, cached MongoDB connection.
 *
 * Why lazy: this module previously threw at *module scope* when MONGODB_URI was
 * missing. Because that happens at import time, the try/catch blocks inside the
 * route handlers could never catch it — so a misconfigured or unreachable
 * database turned every route into a hard 500, even routes like /api/panchang
 * that have a perfectly good local-compute fallback.
 *
 * Exposing a getter instead means the failure surfaces *inside* the handler's
 * try/catch, where the existing fallback logic can take over.
 */

let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // Allow global reuse in development (survives hot reload)
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // Rejected promise rather than a synchronous module-scope throw, so callers
    // can handle it with normal async error handling.
    return Promise.reject(new Error('Missing environment variable: "MONGODB_URI"'));
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, {
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000,
      });
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  // In production / serverless, create a client per module load. Vercel freezes
  // the module between requests, so this IS reused on warm starts.
  const client = new MongoClient(uri, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 1, // keep small for serverless
  });
  return client.connect();
}

/** Get the shared connection promise, creating it on first use. */
export function getMongoClient(): Promise<MongoClient> {
  if (!clientPromise) {
    clientPromise = createClientPromise().catch((err) => {
      // Reset so a later request can retry instead of being stuck with a
      // permanently rejected promise from one transient failure.
      clientPromise = null;
      throw err;
    });
  }
  return clientPromise;
}

/**
 * Backwards-compatible default export.
 *
 * Existing call sites do `await clientPromise`. This thenable defers connection
 * creation until it is actually awaited (inside a handler's try/catch), rather
 * than at import time.
 */
const lazyClientPromise = {
  then<TResult1 = MongoClient, TResult2 = never>(
    onfulfilled?: ((value: MongoClient) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return getMongoClient().then(onfulfilled, onrejected);
  },
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null
  ): Promise<MongoClient | TResult> {
    return getMongoClient().catch(onrejected);
  },
  finally(onfinally?: (() => void) | null): Promise<MongoClient> {
    return getMongoClient().finally(onfinally);
  },
} as PromiseLike<MongoClient> as Promise<MongoClient>;

export default lazyClientPromise;
