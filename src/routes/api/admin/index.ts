import users from "./users";
import exercises from "./exercises";
import rules from "./rules";
import trophies from "./trophies";
import { auth } from "./utils";
import { RouteBuilder } from "../../utils";

export default RouteBuilder.joinRouters(
	[
		{
			route: "/users/",
			controller: users,
		},
		{
			route: "/exercises/",
			controller: exercises,
		},
		{
			route: "/rules/",
			controller: rules,
		},
		{
			route: "/trophies/",
			controller: trophies,
		},
	],
	auth
);
