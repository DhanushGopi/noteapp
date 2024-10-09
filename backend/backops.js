const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb+srv://dhanushgopi:DhanushGopi@danzucluster.jc7ng.mongodb.net/?retryWrites=true&w=majority&appName=danzucluster';
const client = new MongoClient(url);
const dbname = 'office';
const collname = 'todo';

app.get('/getnote', async (req, res) => {
    await client.connect();
    console.log("Getting the Notes is intialized");
    const sdb = await client.db(dbname);
    const todonotes = await sdb.collection(collname).find({}).toArray();
    res.send(todonotes);
    console.log(todonotes);
    console.log("ToDo notes has been loaded sucessfully");
})

app.post('/addnote', async (req, res) => {
    var { time, todonote } = req.body;
    await client.connect();
    const sdb = await client.db(dbname);
    await sdb.collection(collname).insertOne({
        "time": time,
        "todonote": todonote
    })
    console.log("Notes is been Added", time);
    res.json({
        "msg": "Inserted Successfully"
    })
    alert("Added");
})

app.delete('/removenote', async (req, res) => {
    const { id } = req.query;
    await client.connect();
    const sdb = await client.db(dbname);
    await sdb.collection(collname).deleteOne({ "_id": new ObjectId(id) });
    console.log("Notes is been deleted");
    res.json({
        "deleted Msg": "success"
    })

})

app.listen(PORT, () => {
    console.log("todo app backops : Server Starts⚡");
})
