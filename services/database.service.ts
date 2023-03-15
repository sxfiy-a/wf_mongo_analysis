// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
// Global Variables
export const collections: { customers?: mongoDB.Collection } = {} || {}

// Initialize Connection

export async function connectToDatabaseCustomers () {
    dotenv.config();
 
    const client=new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const customersCollection= db.collection(process.env.CUSTOMERS_COLLECTION_NAME as string);
    collections.customers = customersCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${customersCollection.collectionName}`);
 }


 export async function connectToDatabaseCustomersLocal () {
    dotenv.config();
 
    const client=new mongoDB.MongoClient(process.env.DB_CONN_STRING_LOCAL as string);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME_LOCAL);
   
    const customersCollection= db.collection(process.env.CUSTOMERS_COLLECTION_NAME as string);
    collections.customers = customersCollection;
    customersCollection.insertOne({
      name: "tester",
      phone:123456,
      category: "Regu",
      address: "blr",
      age: 30,
      preference: "apple"
    });
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${customersCollection.collectionName}`);
 }