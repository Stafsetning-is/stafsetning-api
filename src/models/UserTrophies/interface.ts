import { Types, Document } from "mongoose";
import {} from "../Exercises";

export interface UserTrophiesInterface extends Document {
	user: Types.ObjectId;
	trophy: Types.ObjectId;
}
