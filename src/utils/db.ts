const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
console.log(uri)
const client = new MongoClient(uri);

const db = client.db('dbv')
export default db