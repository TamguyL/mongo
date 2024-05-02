const {MongoClient} =require('mongodb');

const url = "mongodb://localhost:27017";

const client = new MongoClient(url)

async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      const dbase = client.db("garage")
     // await dbase.collection('voitures').find({ }).toArray(function(err,docs){console.log(docs)})
      let cols = await dbase.collection('food').insertMany([
        { name: "couscous" , description: "semoule legumes poulet pois chiche"} ,
        { name: "choucroute" , description: "chou croute"} ,
        { name: "paella" , description: "plat espagnol"} ,
       ])
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);