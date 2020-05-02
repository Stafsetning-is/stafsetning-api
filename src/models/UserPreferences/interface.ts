import { Types, Document, Model } from "mongoose";

export interface UserPreferencesInterface extends Document {
	user: Types.ObjectId;
	fontSize: FontSize;
	previewTTL: number;
	alwaysShowPreview: boolean;
	showOnScreenKeyboard: boolean;
	textBackground: BackgroundColor;
}

export interface UserPreferencesCollection
	extends Model<UserPreferencesInterface> {
	getPreferencesByUser: (
		uid: Types.ObjectId
	) => Promise<UserPreferencesInterface>;
}

export type FontSize =
	| 14
	| 16
	| 18
	| 20
	| 22
	| 24
	| 26
	| 28
	| 30
	| 32
	| 34
	| 36;

export type BackgroundColor =
	| "#96ADFC"
	| "#DBE1F1"
	| "#A8F29A"
	| "#D8D3D6"
	| "#EDDD6E"
	| "#EDD1B0"
	| "#B987DC"
	| "#E0A6AA"
	| "#A5F7E1"
	| "#F8FD89"
	| "#F8F8F8";
