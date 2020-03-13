import { Document, Model } from "mongoose";

export interface PersonInterface extends Document{
    age: number;
    name: string;
    mother?: PersonInterface;
}

export interface PersonCollectionInterface extends Model<PersonInterface> {
    getRelatives: Promise<PersonInterface[]>;
}
