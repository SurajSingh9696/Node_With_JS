const express = require("express");

const mongoose = require("mongoose");

const exp = express();

exp.use(express.json());

const cors = require("cors");

exp.use(cors());

mongoose.connect("mongodb://localhost:27017/mydata");

const sch = new mongoose.Schema({
    originalUrl : String,
    shortUrl : String
},{
    collection : "url_shortner"
});

const mongo = mongoose.model("url_shortner" , sch);

exp.post("/insert" , async(req , resp)=>{
    const originalUrl = {originalUrl : req.body.originalUrl};
    const exist = await mongo.findOne(originalUrl);
    if(exist){
        resp.send("url already exist");
        console.log("url already exist");
    }
    else{
        const insert = await mongo.create(req.body);
    if(insert){
        resp.status(201).json({message : "Inserted"});
    }
    else{
        resp.send("Not Inserted");
    }
    }


    
})

exp.get("/:shortUrl" , async(req, resp)=>{
    const shortUrl = req.params.shortUrl;
    const data = await mongo.findOne({shortUrl : shortUrl});
    if(data){
        resp.redirect(data.originalUrl);
    }
    else{
        resp.send("Invalid URL");
    }
})


exp.listen(4000 , ()=>{
    console.log("Server is running on port 4000");
})