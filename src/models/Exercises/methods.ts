const SPLITTER = ";;;"
import { ExerciseInterface, ExerciseRepr } from "./interface"

/**
 * returns a representation of the exercise
 * that can be shared with clients, i.e.
 * text is replaced with sentence parts and so on
 */
export const getRepresentation = function (): ExerciseRepr {
    const exercise: ExerciseInterface = this;
    const text = exercise.text.replace(/;;;/g, "");
    const parts = exercise.text.split(SPLITTER);
    return {
        difficultRange: exercise.difficultRange,
        number: exercise.number,
        length: text.length,
        parts
    }
}