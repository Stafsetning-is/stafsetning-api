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

export const getAdminRepresentation = function (
	this: ExerciseInterface
): AdminExerciseRepr {
	const { _id, difficultRange, number, fileName } = this;
	return {
		_id,
		difficultRange,
		number,
		fileName,
		title: this.getTitle(),
		parts: this.getTextParts(),
	};
};

// returns the exercise text
export const getText = function (this: ExerciseInterface) {
	return this.text.replace(`/${SPLITTER}/g`, "");
};

// returns the exercise parts as array of strings
export const getTextParts = function (this: ExerciseInterface) {
	return this.text.split(SPLITTER);
};

// returns the word count of the exercise
export const getWordCount = function (this: ExerciseInterface) {
	return this.getText().split(" ").length;
};

// returns the grammarReport of the exercise
export const getGrammarReport = function (this: ExerciseInterface) {
	return Reporter.getReport(this);
};

// gets the title of the exercise
export const getTitle = function (this: ExerciseInterface) {
	return this.getTextParts()[0];
};

// calculates character count
export const getCharacterCount = function (this: ExerciseInterface) {
	return this.getText().length;
};
