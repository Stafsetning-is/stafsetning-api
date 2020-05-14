import { model, Schema } from "mongoose";
import {
	ALLOWED_FONT_SIZES,
	ALLOWED_BG_COLORS,
	MAX_PREVIEW_TTL,
	MIN_PREVIEW_TTL,
	DEF_FONT_SIZE,
	DEF_PREVIEW_TTL,
	DEF_BG_COLOR,
} from "./utils";
import {
	UserPreferencesCollection,
	UserPreferencesInterface,
	FontSize,
	BackgroundColor,
} from "./interface";
import * as statics from "./statics";

const userPreferencesSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
		unique: true,
		required: true,
	},
	fontSize: {
		type: Number,
		default: DEF_FONT_SIZE,
		validate: {
			validator: (value: FontSize) => ALLOWED_FONT_SIZES.includes(value),
			msg: "Invalid font size",
		},
	},
	previewTTL: {
		type: Number,
		default: DEF_PREVIEW_TTL,
		validate: {
			validator: (value: number) =>
				value <= MAX_PREVIEW_TTL && value >= MIN_PREVIEW_TTL,
			msg: "Invalid preview text TTL",
		},
	},
	alwaysShowPreview: {
		type: Boolean,
		default: false,
	},
	showOnScreenKeyboard: {
		type: Boolean,
		default: false,
	},
	textBackground: {
		type: String,
		default: DEF_BG_COLOR,
		validate: {
			validator: (value: BackgroundColor) =>
				ALLOWED_BG_COLORS.includes(value),
			msg: "Invalid background color",
		},
	},
});

userPreferencesSchema.statics = statics;

export const UserPreferences = model<
	UserPreferencesInterface,
	UserPreferencesCollection
>("userpreferences", userPreferencesSchema, "userpreferences");

export * from "./interface";
