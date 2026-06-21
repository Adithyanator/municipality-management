const { MongoClient } = require('mongodb');

async function main() {
  const uri =
    'mongodb+srv://metro_admin:aG8nMF861Sijvmhx@metroadmin.9489iyl.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');

    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    console.log('Databases:');
    console.log(JSON.stringify(dbs.databases, null, 2));
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await client.close();
  }
}

main();
