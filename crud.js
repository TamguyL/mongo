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

app.get("/", function (req, res) {
  async function liste() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      
      await client.connect();
     // await dbase.collection('voitures').find({ }).toArray(function(err,docs){console.log(docs)})
      let pizza = await  client.db("pizza").collection('pizza').find({}).toArray()
      // let obj = { pizza: pizza}
      res.render('crud', {pizza: pizza})
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  liste().catch(console.dir);
  // renvoi le nom + id des pizzas dans un fichier HTML (axios)
});




// app.get("/listep", (req, res) => {
//   async function liste() {
//     try {
//       // Connect the client to the server (optional starting in v4.7)
//       await client.connect();
//      // await dbase.collection('voitures').find({ }).toArray(function(err,docs){console.log(docs)})
//       let pizza = await  client.db("pizza").collection('pizza').find({}).toArray()
//       let obj = { pizza: pizza}
//       res.json(obj)
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   liste().catch(console.dir);
//   // renvoi le nom + id des pizzas dans un fichier HTML (axios)
// });

app.get("/detail/:id", (req, res) => {
  async function detail() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      let id = req.params.id
      console.log(id)
      await client.connect();
      let detail = await  client.db("pizza").collection('pizza').findOne({_id: id})
      console.log(detail)
      // let obj = { pizza: pizza}
      // res.json(obj)
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  detail().catch(console.dir);
  // renvoi le detaild 'une pizza
});

app.get("/count",(req,res) => {
  async function count() {
    try {
      await client.connect();
      let count = await  client.db("pizza").collection('pizza').count()
      let obj = { count: count}
      res.json(obj)
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  count().catch(console.dir);
  // revoi le nombre de recettes de pizza db.collection.count(query, options)
})