const express = require("express");
const app = express();
const {MongoClient} =require('mongodb');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')

const url = "mongodb://localhost:27017";

const client = new MongoClient(url)

app.listen(8888,() => { console.log('serveur ecoute le port 8888') })
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render('import')
});

app.post("/", upload.single('upload'), function (req, res) {
    const data = JSON.parse(fs.readFileSync('./uploads/'+req.file.filename, 'utf-8'))
    const titre = req.body.titre
    async function run() {
        try {
          // Connect the client to the server (optional starting in v4.7)
          await client.connect();
          const dbase = client.db("garage")
          let cols = await dbase.collection(titre).insertMany(data)
          
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
          console.log('Base données : \''+titre+'\' importée')
          res.render('import')
        }
      }
      run().catch(console.dir);
  })
