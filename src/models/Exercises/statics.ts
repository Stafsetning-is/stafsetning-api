import {ExerciseCollectionInterface, ExerciseRepr} from "./interface";
/**
 * Gets all exercises that fits an users
 * difficulty level
 * @param level the difficulty level
 */
export const getExercisesByDifficulty = async function (level: number): Promise<ExerciseRepr[]> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const Exercises: ExerciseCollectionInterface = this;
    const found = await Exercises.find({
        "difficultRange.min": { $lte: level },
        "difficultRange.max": { $gte: level },
    });
    return found.map((exercise) => exercise.getRepresentation());
};