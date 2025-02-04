const mongoose = require("mongoose");

const express = require("express");

const cors = require("cors");

const exp = express();

exp.use(express.json());

exp.use(cors());

mongoose.connect("mongodb://localhost:27017/localdb");

const sch = new mongoose.Schema({
    topic : String
},{
    collection: "todo"
});

const model = mongoose.model("todo" , sch);

exp.get("/getdata" , async(req , resp) =>{
    let data = await model.find();
    if(!Array.isArray(data)){
        data = [data];
    }
    resp.send(data);
})

exp.post("/update" , async(req , resp)=>{
    let rawdata = req.body;
    await model.deleteMany({});
    resp.send(await model.insertMany(rawdata));
})

exp.listen(3800);