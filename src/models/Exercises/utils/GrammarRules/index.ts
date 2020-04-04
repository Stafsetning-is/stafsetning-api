import { Rule, Exercise } from "./interface";
import rules from "./rules";

export default class GrammarRules {
	private rules: Rule[] = rules;

	public getReport(exercise: Exercise) {
		const { text } = exercise;
	}
}
