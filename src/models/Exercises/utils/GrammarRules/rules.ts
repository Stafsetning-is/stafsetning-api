import { Rule } from "./interface";

export const NG_OG_NK = "ng_nk";
export const KVK_UNN = "kvk_unn";

/**
 * List of rules that the system uses
 */
export const rules: Rule[] = [
	{
		regex: /[^\s]*[AEIOUaeiou](ng|nk)[^\s.,]*/g,
		name: "ng og nk",
		code: NG_OG_NK,
	},
	{
		regex: /([A-Z]|[Þ])[^. ]*[u](nn)(?=[\s.,])/g,
		name: "Kvennmannsnöfn sem enda á -unn",
		code: KVK_UNN,
	},
];
