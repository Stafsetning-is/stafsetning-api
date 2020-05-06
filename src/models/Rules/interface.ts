import { Comparison } from "./utils";
import { Document, Model } from "mongoose";

export interface Rule {
	accessor: string;
	comparison: Comparison;
	value: number;
}

export interface RuleInterface extends Document, Rule {}

export interface RuleCollectionInterface extends Model<RuleInterface> {
	reviewObject: (object: any, rules: Rule[]) => boolean;
}
