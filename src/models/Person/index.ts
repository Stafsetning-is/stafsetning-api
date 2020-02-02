import { Document, model, Schema, Model } from "mongoose";

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

export interface PersonInterface extends Document{
    age: number;
    name: string;
    mother?: PersonInterface;
}

export interface PersonCollectionInterface extends Model<PersonInterface> {
    getRelatives: Promise<PersonInterface[]>;
}

export const Person = model<PersonInterface, PersonCollectionInterface>("person", personSchema, "person");