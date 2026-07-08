import clientPromise from "./lib/mongodb";

async function clearCache() {
  const mongoClient = await clientPromise;
  const db = mongoClient.db("astro_cache");
  await db.collection("panchang_local").deleteMany({});
  await db.collection("hora_local").deleteMany({});
  console.log("Local caches cleared.");
  process.exit(0);
}

clearCache().catch(console.error);
