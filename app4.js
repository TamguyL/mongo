const {MongoClient} =require('mongodb');

const url = "mongodb://localhost:27017";

const client = new MongoClient(url)

async function run() {
    try {

      await client.connect();
      let cols = await  client.db("unicorns").collection('unicorns').find({weight:{$gt:500} }).toArray()
      let cols2 = await  client.db("unicorns").collection('unicorns').find().sort({weight: -1}).toArray()
    //   console.log(cols)
      console.log(cols2)
    } finally {

      await client.close();
    }
  }
  run().catch(console.dir);