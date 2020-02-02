import { Document, model, Schema, Model } from "mongoose"

const personSchema = new Schema({
    age: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mother: {
        type: Schema.Types.ObjectId,
        ref: "person",
        required: false
    }
});

export interface IPerson extends Document{
    age: number;
    name: string;
    mother?: IPerson
}

export interface IPersons extends Model<IPerson> {
    getRelatives: Promise<IPerson[]>
}

export const Person = model<IPerson, IPersons>("person", personSchema, "person");