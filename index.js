const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

let app = express()

app.use(cors())

const mongoClient = require("mongodb").MongoClient

let db;
mongoClient.connect('mongodb+srv://RobyndbUser:Robynmanuel7@cluster1.oegin.mongodb.net'
    , (err, client) => {
        db = client.db('Webstore')
    })

app.use(function (req, res, next) {
    console.log("Request IP: " + req.url);
    console.log("Request date: " + new Date());
    next()
});

app.get("/", (req, res, next) => {
    console.log("root pass");
    res.send('Welcome to the MongoDB Express server.')
})

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    // console.log('collection name:', req.collection)
    return next()
})

app.get('/collection/:collectionName', (req, res) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
    })
});

const port = process.env.PORT || 3000
app.listen(port)