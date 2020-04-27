export interface Rule {
	regex: RegExp;
	name: string;
	code: string;
}

export interface Report {
	[key: string]: {
		count: number;
		name: string;
	};
}

export interface Exercise {
	text: string;
}
