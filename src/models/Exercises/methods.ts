import {
	ExerciseRepr,
	ExerciseInterface,
	AdminExerciseRepr,
} from "./interface";
import { Reporter } from "./utils/GrammarRules";

const SPLITTER = ";;;";

/**
 * returns a representation of the exercise
 * that can be shared with clients, i.e.
 * text is replaced with sentence parts and so on
 */
export const getRepresentation = function (
	this: ExerciseInterface
): ExerciseRepr {
	const text = this.getText();
	const parts = 
	return {
		difficultRange: this.difficultRange,
		number: this.number,
		length: text.length,
		parts,
		title: parts[0],
		_id: this._id,
		wordCount: text.split(" ").length,
		report: Reporter.getReport(this),
		completed: false,
	};
};

export const getAdminReppresentation = function (
	this: ExerciseInterface
): AdminExerciseRepr {
	return;
};

export const getText = function (this: ExerciseInterface) {
	return this.text.replace(/;;;/g, "");
};

export const getTextParts = function (this: ExerciseInterface) {
	return this.text.split(SPLITTER);
}
