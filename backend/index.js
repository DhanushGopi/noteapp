const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://dhanushgopi:DhanushGopi@danzucluster.jc7ng.mongodb.net/?retryWrites=true&w=majority&appName=danzucluster';
const client = new MongoClient(url);
const dbname = 'office';
const collname = 'todo';
app.get('/getnotes', async (req, res) => {
    await client.connect();
    console.log("Getting the Notes is intialized");
    const sdb = await client.db(dbname);
    const todonotes = await sdb.collection(collname).find({}).toArray();
    res.send(todonotes);
    console.log(todonotes);
    console.log("ToDo notes has been loaded sucessfully");
})

app.listen(3001, () => {
    console.log("todo app backops : Server Starts");
})