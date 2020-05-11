import { RuleCollectionInterface, Rule } from "./interface";

/**
 * returns a boolean value depending on if the
 * object passed as argument satisfies the array of rules
 * passed as second argument.
 *
 * @param this type decleration for this
 * @param object any object that has key value storage
 * @param rules array of rules that the object must follow
 */
export const reviewObject = function (
	this: RuleCollectionInterface,
	object: any,
	rules: Rule[]
) {
	return rules.every(({ accessor, comparison, value }) => {
		try {
			let retrieved = object;
			const keys = accessor.split(".");

			// iterate through the keys to traverse through object
			keys.forEach((key) => {
				// is the key an array accessor
				if (key.charAt(0) === ":") {
					// handle array accessor
					const index = Number(key.replace(":", ""));
					retrieved = retrieved[index];
					return;
				}
				// update retrieved
				retrieved = retrieved[key];
			});

			// handle the comparison with the retrieved value
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
			// if there is an error then we return false
			return false;
		}
	});
};
