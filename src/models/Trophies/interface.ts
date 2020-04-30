import { Rule } from "../";
import { Document, Model } from "mongoose";

export interface TrophyInterface extends Document {
	rules: Rule[];
	title: string;
	icon: string;
	description: string;
}

export interface TrophyColllectionInterface extends Model<TrophyInterface> {
	allocateNewTrophiesToUser: (userId: string) => Promise<TrophyInterface[]>;
}
