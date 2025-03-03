// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  const globalMongo = global as typeof globalThis & {
    _mongoClientPromise : Promise<MongoClient>
  }
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!globalMongo._mongoClientPromise) {
    client = new MongoClient(uri)
    globalMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri)
  clientPromise = client.connect()
}


// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
