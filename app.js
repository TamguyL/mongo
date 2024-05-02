
const {MongoClient} =require('mongodb');

const url = "mongodb://localhost:27017";

const client = new MongoClient(url)

async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
     // await dbase.collection('voitures').find({ }).toArray(function(err,docs){console.log(docs)})
      let cols = await  client.db("garage").collection('food').find({ }).toArray()
      let cols2 = await  client.db("garage").collection('voitures').find({ }).toArray()
      console.log(cols)
      console.log(cols2)
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

   
