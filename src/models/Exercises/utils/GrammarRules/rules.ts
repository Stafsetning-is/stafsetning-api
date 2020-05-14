import { Rule } from "./interface";

export const NG_OG_NK = "ngnk";
export const KVK_UNN = "kvkunn";
export const STOR_NAFN = "storStafurNafn";
export const N_OR_NN = "nOgNn";

/**
 * List of rules that the system uses
 * to detech grammar in text
 */
export const rules: Rule[] = [
	{
		regex: /[^\s]*[AEIOUaeiou](ng|nk)[^\s.,]*/g,
		name: "ng og nk",
		code: NG_OG_NK,
	},
	{
		regex: /([A-Z]|[Þ])[^. ]*[u](nn)(?=[\s.,])/g,
		name: "kvk nöfn sem enda á -unn",
		code: KVK_UNN,
	},
	{
		regex: /(?<=([a-z] ))[A-Z][^\s.,]*/g,
		name: "stór stafur",
		code: STOR_NAFN,
	},
	{
		regex: /(nn|(n)(\.|,| ))/g,
		name: "n og nn",
		code: N_OR_NN,
	},
];
