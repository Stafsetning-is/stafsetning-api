import { Document, Model } from "mongoose";

export interface UserScoreCardInterface extends Document {
	user: string;
	loginStreak: number;
	lastLoggedIn: Date;
	created: Date;
}

export interface UserScoreCardCollection extends Model<UserScoreCardInterface> {
	logActivity: (userId: string) => Promise<void>;
	generateScoreCard: (userId: string) => Promise<ScoreCard>;
}

export interface ScoreCard {
	loginStreak: number;
	lastLoggedIn: Date;
	created: Date;
	intervals: IntervalScoreCards;
	lastScore: number;
}

export interface IntervalScoreCards {
	today: ScoreAggregation;
	thisWeek: ScoreAggregation;
	thisMonth: ScoreAggregation;
	thisYear: ScoreAggregation;
	sinceBeginning: ScoreAggregation;
}

export interface ScoreAggregation {
	average: number;
	count: number;
	scoresAbove: [
		number,
		number,
		number,
		number,
		number,
		number,
		number,
		number,
		number,
		number
	];
	grammarRuleCount: { [key: string]: number };
}
