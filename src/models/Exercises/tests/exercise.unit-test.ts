import { Exercises } from "../";

const testBody = {
	difficultRange: {
		min: 5,
		max: 10
	},
	text: "Kalli for ut i bud;;; til ad kaupa mjolk,;;; handa mommu sinni."
};

const otherTest = {
	difficultRange: {
		min: 7,
		max: 9
	},
	text: "Kalli for ut i bud;;; til ad kaupa mjolk,;;; handa mommu sinni."
};

beforeAll( () => {
    // await Exercises.create(testBody);
    // await Exercises.create(otherTest);
	// done();
	
	// done();
});

describe("Getting exercises by user difficulty", () => {
	// it("Should return same as difficulty min", async (done) => {
	// 	const [q1, q2] = await Promise.all([
	// 		Exercises.getExercisesByDifficulty(5),
	// 		Exercises.getExercisesByDifficulty(7)
	// 	]);
	// 	expect(q1.length).toEqual(1);
	// 	expect(q2.length).toEqual(2);
	// 	done();
	// });

    // it("Should return same as difficulty max", async (done) => {
	// 	const [q1, q2] = await Promise.all([
	// 		Exercises.getExercisesByDifficulty(9),
	// 		Exercises.getExercisesByDifficulty(10)
	// 	]);
	// 	expect(q1.length).toEqual(2);
	// 	expect(q2.length).toEqual(1);
	// 	done();
    // });

	it("Should return exercise if its somewhere in between", async (done) => {
		const q = await Exercises.getExercisesByDifficulty(8);
		expect(q.length).toEqual(2);
        done();
    });
});

describe("Should get correct representation of exercise", () => {
    it("Should return sentence parts", async (done) => {
		const [exercise] = await Exercises.getExercisesByDifficulty(8);
        expect(exercise).toHaveProperty("parts");
        done();
    });

    it("Should not have text property", async (done) => {
		const [exercise] = await Exercises.getExercisesByDifficulty(8);
        expect(exercise).not.toHaveProperty("text");
        done();
    });
});