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
		const report: Report = {};
		Reporter.rules.forEach(({ code, regex, name }) => {
			const match = exercise.text.match(regex);
			if (!match) return;
			const count = match ? match.length : 0;
			report[code] = {
				count: count,
				name: name,
			};
		});
		return report;
	}
}

export * from "./rules";
