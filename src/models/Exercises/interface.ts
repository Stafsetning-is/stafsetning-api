import {Document, Model} from "mongoose"
interface Base {
    difficultRange: [number, number];
    number: number;
}

export interface ExerciseInterface extends Base, Document {
    text: string;

}

export interface ExerciseRepr extends Base { 
    length: number;
    parts: string[];
}

export interface ExerciseCollectionInterface extends Model<ExerciseInterface> {
    getExercisesByDifficulty: Promise<ExerciseRepr[]>;
}
