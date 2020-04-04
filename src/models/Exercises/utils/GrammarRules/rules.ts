import { Rule } from "./interface";

const rules: Rule[] = [
	{
		regex: /[^\s]*[aeiou](ng|nk)[^\s.,]*/,
		name: "ng og nk",
		code: "ng_nk",
	},
	{
		regex: /([A-Z]|[Þ])[^. ]*[u](nn)(?=[\s.,])/,
		name: "Kvennmannsnöfn sem enda á -unn",
		code: "kvk_unn",
	},
];

export default rules;
