    
let {MongoClient} = require("mongodb");

require("dotenv").config();
let URL= process.env.URL;

let connectDb =  async()  =>{
    try{
        let client = await MongoClient.connect(URL);
        let db = client.db("Equipment");
        console.log("DB Created");
        if(db){
            return db;
        }

    }catch(e){

    }
}

module.exports = {connectDb}