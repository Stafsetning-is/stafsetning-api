export const isObject = <T>(value: T) => {
	return value && typeof value === "object" && value.constructor === Object;
};
