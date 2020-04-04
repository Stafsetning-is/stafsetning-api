import { Reporter, KVK_UNN, NG_OG_NK } from "../utils/GrammarRules";

describe("Automatic grammar rule reporter", () => {
	// testing kvk names ending with unn
	it("Should count correctly", () => {
		const exercise = {
			text:
				"Steinunn taladi við Þórunn. Ingunn átti gullfisk sem hét Iðunn, og hann var étinn af kettinum Gíslunn ",
		};
		const report = Reporter.getReport(exercise);
		expect(report).toHaveProperty(KVK_UNN, {
			count: 5,
		});
	});

	// testing ng and nk rules
	it("Should count correctly", () => {
		const exercise = {
			text:
				"Ungi drengurinn fór í bankann. Hann var svangur. Dagurinn var langur",
		};
		const report = Reporter.getReport(exercise);
		expect(report).toHaveProperty(NG_OG_NK, {
			count: 5,
		});
	});
});
