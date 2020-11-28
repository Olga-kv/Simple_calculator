import { Document } from 'mongoose';

export interface Result extends Document {
    readonly value1: String;
    readonly value2: String;
    readonly operator: string;
    readonly numberType: String;
    readonly result: String;
}