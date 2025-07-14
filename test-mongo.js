const { MongoClient } = require('mongodb');

async function testMongo() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

testMongo();
