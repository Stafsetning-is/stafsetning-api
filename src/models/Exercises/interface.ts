import {Document, Model} from "mongoose";
interface Base {
    difficultRange: {
        min: number;
        max: number;
    };
    number: number;
}

export interface ExerciseInterface extends Base, Document {
    text: string;
    getRepresentation: () => ExerciseRepr;
}

export interface ExerciseRepr extends Base { 
    length: number;
    parts: string[];
    title: string;
    _id: any;
    wordCount: number;
}

export interface ExerciseCollectionInterface extends Model<ExerciseInterface> {
    getExercisesByDifficulty: (level: number) => Promise<ExerciseRepr[]>;
}
