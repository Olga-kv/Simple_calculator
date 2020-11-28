import * as mongoose from 'mongoose';

export const CalculatorSchema = new mongoose.Schema({
     value1: String,
     value2: String,
     operator: String,
     numberType: String,
     result: String
})