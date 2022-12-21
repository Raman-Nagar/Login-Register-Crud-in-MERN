const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var cors = require('cors')

const CONNECTION_URL ="mongodb://127.0.0.1:27017" ;
const DATABASE_NAME = "data";

var app = Express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("student");
        console.log("Connected to `" + DATABASE_NAME + " with collection name Student`" );
    });

});

app.get("/studata", (request, response) => {

    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/stu/:id", (request, response) => {

    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/studata", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.put("/stu/:id", (request, response) => {
    collection.updateOne({ "_id": new ObjectId(request.params.id) },{$set:request.body}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.delete("/stu/:id", (request, response) => {
    collection.remove({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


app.post("/loginCheck", async(request, response) => {

    try{
        const eml = request.body.userID;
        const pass = request.body.password
        console.log(eml)
        console.log(pass)
        const inputUser =await collection.findOne({email:eml});
        console.log(inputUser)

        if(inputUser.password === pass){
            response.status(201).send("login Successfully...!!!")
        } else{
            response.status(400).send("invalid Password details");
        }
    } catch(error){
        response.status(400).send("invalid User details");
    }
});