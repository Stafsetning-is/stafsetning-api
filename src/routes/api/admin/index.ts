import users from "./users";
import exercises from "./exercises";
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
	],
	auth
);
