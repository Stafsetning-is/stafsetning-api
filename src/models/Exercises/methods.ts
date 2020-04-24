const SPLITTER = ";;;";
import { ExerciseRepr, ExerciseInterface } from "./interface";
import { Reporter } from "./utils/GrammarRules";

/**
 * returns a representation of the exercise
 * that can be shared with clients, i.e.
 * text is replaced with sentence parts and so on
 */
export const getRepresentation = function (
	this: ExerciseInterface
): ExerciseRepr {
	const text = this.text.replace(/;;;/g, "");
	const parts = this.text.split(SPLITTER);
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
