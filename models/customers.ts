// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation

export default class Customer {
    constructor(
        public name: string, 
        public phone: number, 
        public category: string, 
        public address: string,
        public age: number,
        public preference: string,
        public id?: ObjectId        
        ) {}
}