import express from "express";
import { connectToDatabaseCustomers, connectToDatabaseCustomersLocal } from "./services/database.service"
import { customersRouter } from "./routes/customers.router";
import dotenv from "dotenv";
import cors from "cors";

const port = 5000;
const port_local = 3000;

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());

//Connects to Mongo Atlas
// connectToDatabaseCustomers()
//     .then(() => {
        
//         app.use('/customers', customersRouter);
//         app.listen(port, () => {
//             console.log(`Server started at http://localhost:${port}`);
//         });
//     })
//     .catch((error: Error) => {
//         console.error("Database connection failed", error);
//         process.exit();
//     });


//Connects to Mongo Local
connectToDatabaseCustomersLocal()
    .then(() => {
        
        app.use('/customers', customersRouter);
        app.get('/', (req, res) => {
            res.send('Hello, world!');
          });
        app.listen(port_local, () => {
            console.log(`Server started at http://localhost:${port_local}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });