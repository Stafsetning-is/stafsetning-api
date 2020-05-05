import { PracticeCollectionInterface } from "./interface";

export const getFinishedExercises = async function (
    this: PracticeCollectionInterface
): Promise<number> {
    return await this.find().distinct("exercise").count();
};
