export interface Rule {
	regex: RegExp;
	name: string;
	code: string;
}

export interface Report {
	[key: string]: {
		count: number;
	};
}

export interface Exercise {
	text: string;
}
