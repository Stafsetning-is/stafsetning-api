import {ExerciseCollectionInterface, ExerciseRepr} from "./interface"
/**
 * Gets all exercises that fits an users
 * difficulty level
 * @param level the difficulty level
 */
export const getExercisesByDifficulty = async function (level: number): Promise<ExerciseRepr[]> {
    const Exercises: ExerciseCollectionInterface = this;
    const found = await Exercises.find({
        difficultRange: [
            {$gt: level - 1}, {$lt: level + 1}
        ]
    })
    return found.map((exercise) => exercise.getRepresentation());
}