import { Types, Document, Model } from "mongoose";
import { TrophyInterface } from "../";

export interface UserTrophiesInterface extends Document {
	user: Types.ObjectId;
	trophy: Types.ObjectId;
}

export interface UserTrophiesCollection extends Model<UserTrophiesInterface> {
	handOutTrophyToUser: (userId: string) => Promise<TrophyInterface>;
}
