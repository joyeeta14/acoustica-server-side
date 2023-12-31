const express=require('express');
const app=express();
const cors = require('cors');

require('dotenv').config()
const port = process.env.PORT || 5000;

//middlewares 
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.aibkcfj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const classCollection = client.db("acousticaDB");
const classInfo = classCollection.collection("classInfo");
const userCollection = client.db("acousticaDB");
const userInfo = userCollection.collection("userInfo");



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect(error => {
      if(error){
        console.log(error);
        return;
      }
    })
    

    
    app.get('/users',async(req,res)=>{
      const cursor = userInfo.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    
    app.get('/addClasses',async(req,res)=>{
      const cursor = classInfo.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/addClasses/:email',async(req, res)=>{
        const email = req.params.email;
        const query = { instructorEmail: email };
        const result = await classInfo.findOne(query);
        res.send(result);
     })

    app.get('/approvedClasses',async(req, res)=>{
      const query = { status: "approved" };
        const result = await classInfo.find(query).toArray();
        res.send(result);
     })
    app.get('/instructors',async(req, res)=>{
      const query = { role: "instructor" };
        const result = await userInfo.find(query).toArray();
        res.send(result);
     })

    app.get('/addClasses/:id',async(req, res)=>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await classInfo.findOne(query);
        res.send(result);
     })
    app.post('/addClasses',async(req, res)=>{
      const file = req.body;
      const result = await classInfo.insertOne(file);
      res.send(result);
    })

    app.post('/users',async(req, res)=>{
      const user=req.body;
      const result = await userInfo.insertOne(user);
      console.log(result);
    })







    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.log);



app.get('/', (req,res)=>{
  res.send("Sitting on a high speed voltage");
})
app.listen(port, ()=>{
    console.log(`running ${port}`);
})