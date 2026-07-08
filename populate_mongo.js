const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://princevishwakarma126_db_user:LojwKdXuzVlvKiXz@cluster0.y34soqs.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

const PROKERALA_CLIENT_ID = "01b01af5-868e-43c7-a42b-ad8870f5a39a";
const PROKERALA_CLIENT_SECRET = "oTU0jNbFF9WJSKp12jfMAHxmREYbqfJZtsrY3QAN";

async function populate() {
  try {
    await client.connect();
    const db = client.db("astro_cache");
    
    // Get token
    const tokenRes = await fetch("https://api.prokerala.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "client_credentials", client_id: PROKERALA_CLIENT_ID, client_secret: PROKERALA_CLIENT_SECRET }),
    });
    const tokenData = await tokenRes.json();
    const token = tokenData.access_token;

    const dateStr = new Date().toISOString().slice(0, 10) + "T00:00:00+05:30";
    console.log("Fetching Panchang for", dateStr);
    
    const pRes = await fetch(`https://api.prokerala.com/v2/astrology/panchang/advanced?ayanamsa=1&coordinates=26.85,80.95&datetime=${encodeURIComponent(dateStr)}&la=en`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const panchangData = await pRes.json();
    
    if (panchangData.data) {
       await db.collection("panchang").updateOne(
         { ayanamsa: "1", coords: "26.85,80.95", dateStr },
         { $set: { data: panchangData.data, updatedAt: new Date() } },
         { upsert: true }
       );
       console.log("Panchang saved to Mongo!");
    } else {
       console.log("Panchang err:", panchangData);
    }
    
    console.log("Fetching Hora...");
    const base = `ayanamsa=1&coordinates=26.85,80.95&datetime=${encodeURIComponent(dateStr)}&la=en`;
    const [hRes, cRes] = await Promise.all([
      fetch(`https://api.prokerala.com/v2/astrology/hora?${base}`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`https://api.prokerala.com/v2/astrology/choghadiya?${base}`, { headers: { Authorization: `Bearer ${token}` } })
    ]);
    const horaData = await hRes.json();
    const chogData = await cRes.json();
    
    if (horaData.data && chogData.data) {
       await db.collection("hora").updateOne(
         { coords: "26.85,80.95", dateStr },
         { $set: { data: { hora: horaData.data, choghadiya: chogData.data }, updatedAt: new Date() } },
         { upsert: true }
       );
       console.log("Hora/Choghadiya saved to Mongo!");
    } else {
       console.log("Hora err:", horaData, chogData);
    }
  } finally {
    await client.close();
  }
}

populate();
