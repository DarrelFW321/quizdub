import {MongoClient, ServerApiVersion} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.Mongo_URI;

console.log(uri);

const client = new MongoClient(uri,{
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

try{
    await client.connect();
    await client.db("admin").command({ping:1});
    console.log(
        "pinged your deployment. You succesfully ocnnected to MongoDB!"
    );
}catch(err){
    console.error(err);
}

let db =client.db("employees");

export default db;