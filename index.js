const express=require('express');
const app=express();
const cors = require('cors');
const port = process.env.PORT || 5000;


app.get('/', (req,res)=>{
    res.send("Sitting on a high speed voltage");
})
app.listen(port, ()=>{
    console.log(`running ${port}`);
})