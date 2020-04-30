import { RuleCollectionInterface, Rule } from "./interface";

export const reviewObject = function (
	this: RuleCollectionInterface,
	object: any,
	rules: Rule[]
) {
	return rules.every(({ accessor, comparison, value }) => {
		try {
			let retrieved = object;
			const keys = accessor.split(".");

			keys.forEach((key) => {
				if (key.charAt(0) === ":") {
					const index = Number(key.replace(":", ""));
					retrieved = retrieved[index];
					return;
				}
				retrieved = retrieved[key];
			});

			switch (comparison) {
				case "eq":
					return value === retrieved;
				case "gt":
					return value < retrieved;
				case "gte":
					return value <= retrieved;
				case "lt":
					return value > retrieved;
				case "lte":
					return value >= retrieved;
				default:
					return false;
			}
		} catch (error) {
			return false;
		}
	});
};
