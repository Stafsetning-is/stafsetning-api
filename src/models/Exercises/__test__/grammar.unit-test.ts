import { Reporter, KVK_UNN, NG_OG_NK, STOR_NAFN } from "../utils/GrammarRules";

describe("Automatic grammar rule reporter", () => {
	// testing kvk names ending with unn
	it("Should count correctly", () => {
		const exercise = {
			text:
				"Steinunn taladi við Þórunn. Ingunn átti gullfisk sem hét Iðunn, og hann var étinn af kettinum Gíslunn ",
		};
		const report = Reporter.getReport(exercise);
		expect(report[KVK_UNN]).toHaveProperty("count", 5);
	});

	// testing ng and nk rules
	it("Should count correctly", () => {
		const exercise = {
			text:
				"Ungi drengurinn fór í bankann. Hann var svangur. Dagurinn var langur",
		};
		const report = Reporter.getReport(exercise);
		expect(report[NG_OG_NK]).toHaveProperty("count", 5);
	});

	// testing capital letters in names
	it("Should count correctly", () => {
		const exercise = {
			text: "Langaði Nönnu að hanga.",
		};
		const report = Reporter.getReport(exercise);
		expect(report[STOR_NAFN]).toHaveProperty("count", 1);
	});
});
