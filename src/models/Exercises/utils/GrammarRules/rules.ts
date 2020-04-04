import { Rule } from "./interface";

const rules: Rule[] = [
	{
		regex: /[^\s]*[aeiou](ng|nk)[^\s.,]*/g,
		name: "ng og nk",
		code: "ng_nk",
	},
	{
		regex: /([A-Z]|[Þ])[^. ]*[u](nn)(?=[\s.,])/g,
		name: "Kvennmannsnöfn sem enda á -unn",
		code: "kvk_unn",
	},
];

export default rules;
