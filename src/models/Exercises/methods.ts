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
	const { _id, number, difficultRange } = this;
	return {
		_id,
		number,
		difficultRange,
		completed: false,
		length: this.getCharacterCount(),
		title: this.getTitle(),
		wordCount: this.getWordCount(),
		report: this.getGrammarReport(),
		parts: this.getTextParts(),
	};
};

export const getText = function (this: ExerciseInterface) {
	return this.text.replace(/;;;/g, "");
};

export const getTextParts = function (this: ExerciseInterface) {
	return this.text.split(SPLITTER);
};

export const getWordCount = function (this: ExerciseInterface) {
	return this.getText().split(" ").length;
};

export const getGrammarReport = function (this: ExerciseInterface) {
	return Reporter.getReport(this);
};

export const getTitle = function (this: ExerciseInterface) {
	return this.getTextParts()[0];
};

export const getCharacterCount = function (this: ExerciseInterface) {
	return this.getText().length;
};
