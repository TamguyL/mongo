const express = require("express");
const app = express();
const {MongoClient,ObjectId} =require('mongodb');

const url = "mongodb://localhost:27017";

const client = new MongoClient(url)

app.listen(8888,() => { console.log('serveur ecoute le port 8888') })
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    async function run() {
        try {
    
          await client.connect();
          let cols = await  client.db("unicorns").collection('unicorns').find().toArray()
          res.render('index', {resultat: cols})
        } finally {
            
          await client.close();
        }
    }
    run().catch(console.dir);
});

app.get('/licorne/:id', function (req, res) {
    async function run() {
        try {
    
          await client.connect();
          const dbase = client.db("unicorns")
          let objid = new ObjectId(req.params.id)
        //   console.log(objid)
          let cols = await dbase.collection('unicorns').findOne({_id:objid})
          res.json(cols)
        } finally {
            
          await client.close();
        }
    }
    run().catch(console.dir);
})