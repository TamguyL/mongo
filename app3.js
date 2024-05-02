
const {MongoClient} =require('mongodb');

const url = "mongodb://localhost:27017";

const client = new MongoClient(url)

async function run() {
    try {

      await client.connect();
      const dbase = client.db("garage")
    //  suppr un
      await  dbase.collection('food').deleteOne({ name : 'choucroute'})
    //  suppr plusieurs
    } finally {

      await client.close();
    }
  }
  run().catch(console.dir);

   
