import {
	ExerciseRepr,
	ExerciseInterface,
	AdminExerciseRepr,
} from "./interface";
import { Reporter } from "./utils/GrammarRules";
import { PART_SPLITTER } from "./utils";

/**
 * returns a representation of the exercise
 * that can be shared with clients, i.e.
 * text is replaced with sentence parts and so on
 */
export const getRepresentation = function (
	this: ExerciseInterface
): ExerciseRepr {
	const { _id, difficultRange, counter, owner } = this;
	return {
		_id,
		difficultRange,
		owner,
		counter: counter ? counter : 0,
		completed: false,
		length: this.getCharacterCount(),
		title: this.getTitle(),
		wordCount: this.getWordCount(),
		report: this.getGrammarReport(),
		parts: this.getTextParts(),
	};
};

/**
 * Returns an interface of the resource
 * fitting for admins that are working with it
 */
export const getAdminRepresentation = function (
	this: ExerciseInterface
): AdminExerciseRepr {
	const { _id, difficultRange, fileName, published, counter, owner } = this;
	return {
		_id,
		difficultRange,
		published,
		fileName,
		owner,
		counter: counter ? counter : 0,
		title: this.getTitle(),
		parts: this.getTextParts(),
	};
};

// returns the exercise text
export const getText = function (this: ExerciseInterface) {
	return this.text.replace(`/${PART_SPLITTER}/g`, "");
};

// returns the exercise parts as array of strings
export const getTextParts = function (this: ExerciseInterface) {
	return this.text.split(PART_SPLITTER);
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
