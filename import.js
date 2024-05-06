const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const url = "mongodb://localhost:27017";
const client = new MongoClient(url)

app.listen(8888, () => { console.log('serveur ecoute le port 8888') })
app.set("view engine", "ejs");

app.get("/", function (req, res) { res.render('import') });

app.post("/", upload.single('upload'), function (req, res) {
  const data = JSON.parse(fs.readFileSync('./uploads/' + req.file.filename, 'utf-8'))
  const titre = req.body.titre
  async function run() {
    try {
      await client.connect();
      const dbase = client.db(titre)
      let cols = await dbase.collection(titre).insertMany(data)
    } finally {
      await client.close();
      console.log('Base données : \'' + titre + '\' importée')
      res.render('import')
    }
  }
  run().catch(console.dir);
})
