import { Rules, Rule } from "../../";

describe("Testing rule review", () => {
	it("should compare eq flag correctlly", () => {
		const object = {
			first: {
				second: {
					third: [1, 2, 4, 8],
				},
			},
		};
		const rule: Rule = {
			accessor: "first.second.third.:2",
			comparison: "eq",
			value: 4,
		};

		const output = Rules.reviewObject(object, [rule]);
		expect(output).toBe(true);
	});

	it("should compare gt flag correctlly", () => {
		const object = {
			first: {
				second: {
					third: [1, 2, 4, 8],
				},
			},
		};
		const rule: Rule = {
			accessor: "first.second.third.:3",
			comparison: "gt",
			value: 5,
		};

		const output = Rules.reviewObject(object, [rule]);
		expect(output).toBe(true);
	});

	it("should compare gte flag correctlly", () => {
		const object1 = {
			first: {
				second: {
					third: [1, 2, 4, 8],
				},
			},
		};
		const object2 = {
			first: {
				second: {
					third: [1, 2, 5, 8],
				},
			},
		};
		const rule: Rule = {
			accessor: "first.second.third.:2",
			comparison: "gte",
			value: 4,
		};

		const output1 = Rules.reviewObject(object1, [rule]);
		const output2 = Rules.reviewObject(object2, [rule]);
		expect(output1 && output2).toBe(true);
	});

	it("should compare lt flag correctlly", () => {
		const object = {
			first: {
				second: {
					third: [1, 2, 4, 8],
				},
			},
		};
		const rule: Rule = {
			accessor: "first.second.third.:1",
			comparison: "lt",
			value: 5,
		};

		const output1 = Rules.reviewObject(object, [rule]);
		expect(output1).toBe(true);
	});

	it("should compare lte flag correctlly", () => {
		const object1 = {
			first: {
				second: {
					third: [1, 2, 4, 8],
				},
			},
		};
		const object2 = {
			first: {
				second: {
					third: [1, 3, 5, 8],
				},
			},
		};
		const rule: Rule = {
			accessor: "first.second.third.:2",
			comparison: "lte",
			value: 5,
		};

		const output1 = Rules.reviewObject(object1, [rule]);
		const output2 = Rules.reviewObject(object2, [rule]);
		expect(output1 && output2).toBe(true);
	});
});
