import { Rule } from "./interface";

export const NG_OG_NK = "ngnk";
export const KVK_UNN = "kvkunn";
export const STOR_NAFN = "storStafurNafn";
export const N_OR_NN = "nOgNn";
export const HV_OR_KV = "kvhv";
export const J_AFTER_G_OR_K = "jEftirGedaK";
export const GS_KS_X = "gsksx";

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
		regex: /(g|k)j/g,
		name: "j eftir g eða k",
		code: J_AFTER_G_OR_K,
	},
	{
		regex: /(gs|ks|x)/g,
		name: "gs, ks eða x",
		code: GS_KS_X,
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
	{
		regex: /((h|H)|(k|K))v/g,
		name: "hv og kv",
		code: HV_OR_KV,
	},
];
