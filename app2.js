
const {MongoClient} =require('mongodb');

const url = "mongodb://localhost:27017";

const client = new MongoClient(url)

async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      const dbase = client.db("garage")
     // await dbase.collection('voitures').find({ }).toArray(function(err,docs){console.log(docs)})
    //  modifier un champs pour un seul
      await  dbase.collection('food').updateOne({ name : 'choucroute'}, {$set: {description: 'une autre description'}})
      //  modifier ou crée un champs pour plusieurs
      await  dbase.collection('food').updateMany({ }, {$set: {quantity: 20}})
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

   
