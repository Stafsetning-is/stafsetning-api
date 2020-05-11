import { ScoreAggregation } from "./interface";
import { PracticeInterface } from "..";

export const DAY_IN_MS = 1000 * 60 * 60 * 24;
export const DAY = 1;
export const WEEK = 7;
export const MONTH = 30;
export const YEAR = 365;
export const MAX_GRADE = 10;

/**
 * Helper function to generate a blank
 * aggregation object
 */
const getBlankAggregation = (): ScoreAggregation => ({
	average: 0,
	count: 0,
	scoresAbove: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	grammarRuleCount: {},
});

/**
 * returns an Score aggregation object for
 * date interval
 *
 * @param practices practice array to aggregate
 * @param daysInAggregation number of days to inclulde in aggregation
 */
export const aggregatePractices = (
	practices: PracticeInterface[],
	daysInAggregation?: number
) => {
	const minimumDate = new Date();
	if (daysInAggregation) {
		minimumDate.setDate(minimumDate.getDate() - daysInAggregation);
		practices = practices.filter(
			(practice) => practice.createdAt > minimumDate
		);
	}
	const aggregation = getBlankAggregation();
	const gradeSum = practices.reduce(
		(prev, curr) => prev + curr.getScore(),
		0
	);
	const average = practices.length === 0 ? 0 : gradeSum / practices.length;
	aggregation.count = practices.length;
	aggregation.average = average;
	practices.forEach((practice) => {
		for (let i = 1; i <= MAX_GRADE; i++) {
			const scoreBaseTen = practice.getScore() * MAX_GRADE;
			if (i <= scoreBaseTen) aggregation.scoresAbove[i - 1]++;
			else break;
		}
	});
	return aggregation;
};
