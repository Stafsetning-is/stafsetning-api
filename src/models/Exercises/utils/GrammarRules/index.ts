import { Rule, Exercise, Report } from "./interface";
import { rules } from "./rules";

export class Reporter {
	private static rules: Rule[] = rules;

	/**
	 * Takes in an exercise interfacce
	 * and scans through grammar rules
	 * via regex and generates a report
	 * about how many times each rule appears
	 * @param exercise item conforming to exercise interface
	 */
	public static getReport(exercise: Exercise): Report {
		const { text } = exercise;
		const report: Report = {};
		Reporter.rules.forEach(({ name, code, regex }) => {
			const match = text.match(regex);
			report[code] = {
				count: match ? match.length : 0,
			};
		});
		return report;
	}
}

export * from "./rules";
