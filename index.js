const express = require('express')
const path = require('path')
const bodyParser= require('body-parser')
const fs = require('fs')
const cors = require('cors')

let app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mongoClient = require("mongodb").MongoClient

let db, Orders;
mongoClient.connect('mongodb+srv://RobyndbUser:Robynmanuel7@cluster1.oegin.mongodb.net'
    , (err, client) => {
        db = client.db('Webstore')
        users = db.collection("Orders")
    })

app.param('collectionName', (req, res, next, collectionName) => {
        req.collection = db.collection(collectionName)
        // console.log('collection name:', req.collection)
        return next()
    })
    
app.use(function (req, res, next) {
    console.log("Request IP: " + req.url);
    console.log("Request date: " + new Date());
    next()
});

app.get('/Images',function(request,response,next){
    var filePath = path.join(__dirname,"static", 'stat.txt')
    fs.stat(filePath,function(err,fileInfo){
        if(err){
            next()
            return 
        }
        else if(fileInfo.isFile()) response.sendFile(filePath)
       
    })
})

app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
        next()
    })
})


app.get("/", (req, res, next) => {
    console.log("root pass");
    res.send('Welcome to the MongoDB Express server.')
    next()
})

app.post("/Orders", (req, res) => {
    users.insert(req.body, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result.result);
    });
  });


const port = process.env.PORT || 3000
app.listen(port)