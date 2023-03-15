// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Customer from "../models/customers";
import { collections } from "../services/database.service";
import { Stopwatch } from "../util/stopwatch";
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import fs from 'fs';

// Global Config
export const customersRouter = express.Router();
const stopwatch = new Stopwatch();


customersRouter.use(express.json()); 

// GET
customersRouter.get("/", async (_req: Request, res: Response) => {
    try {
        if(collections.customers){
            stopwatch.start();
            const games = (await collections.customers.find({}).toArray()) as unknown as Customer[];  
              
            res.status(200).send(games);
            stopwatch.stop();    
            console.log(`Elapsed time- get: ${stopwatch.getTime()}ms`);
        }
        else {
            res.status(401).send("Error");
        }
    } catch (error:unknown) {
        res.status(500).send("Errorr");
    }
});

customersRouter.get("/file", async (_req: Request, res: Response) => {
    try {
        stopwatch.start();
        const fileName = "customers.txt";
        const filePath = `C:\\Users\\safiy\\OneDrive\\Desktop\\wf learning\\mongo_ts\\files\\customers.txt`;
    
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
          res.status(404).send('File not found');
          return;
        }
    
        // Read the file and send its contents as a response
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        res.send(fileContent);
        stopwatch.stop();    
        console.log(`Elapsed time- get- local: ${stopwatch.getTime()}ms`);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving file');
      }
});

customersRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };

        if(collections.customers) {
            stopwatch.start();
            const game = (await collections.customers.findOne(query)) as unknown as Customer;
            if (game) {
                res.status(200).send(game);
            }
            stopwatch.stop();
            console.log(`Elapsed time- get - id: ${stopwatch.getTime()}ms`);

        }
        

        
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
// // POST
customersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newCustomer = req.body as Customer;

        if(collections.customers) {
            console.log("here");
            stopwatch.start();
            const result = await collections.customers.insertOne(newCustomer) ;

            result
            ? res.status(201).send(`Successfully created a new cust with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new cust.");

            stopwatch.stop();
            console.log(`Elapsed time-post: ${stopwatch.getTime()}ms`);

        }
        

        
    } catch (error: unknown) {
        console.error(error);
        res.status(400).send("post error");
    }
});

customersRouter.post("/many", async (req: Request, res: Response) => {
    try {
        const newCustomer = req.body;

        if(collections.customers) {
            stopwatch.start();
            const result = await collections.customers.insertMany(newCustomer) ;

            result
            ? res.status(201).send(`Successfully inserted many}`)
            : res.status(500).send("Failed to create a new cust.");

            stopwatch.stop();
            console.log(`Elapsed time-post: ${stopwatch.getTime()}ms`);

        }
        

        
    } catch (error: unknown) {
        console.error(error);
        res.status(400).send("post error");
    }
});

// PUT

// DELETE