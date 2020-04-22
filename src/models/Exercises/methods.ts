const SPLITTER = ";;;";
import { ExerciseRepr, ExerciseInterface } from "./interface";
import { Reporter } from "./utils/GrammarRules";

/**
 * returns a representation of the exercise
 * that can be shared with clients, i.e.
 * text is replaced with sentence parts and so on
 */
export const getRepresentation = function (): ExerciseRepr {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: ExerciseInterface = this;
    const text = self.text.replace(/;;;/g, "");
    const parts = self.text.split(SPLITTER);
    return {
        difficultRange: self.difficultRange,
        number: self.number,
        length: text.length,
        parts,
        title: parts[0],
        _id: self._id,
        wordCount: text.split(" ").length,
        report: Reporter.getReport(self),
        practice: self.practice,
        completed: self.completed,
    };
};
