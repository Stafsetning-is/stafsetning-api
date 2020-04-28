import exercises from "./exercises";
import practices from "./practices";
import users from "./users";
import { RouteBuilder } from "../../utils";
import { auth } from "./utils";

export default RouteBuilder.joinRouters(
	[
		{
			route: "/exercises/",
			controller: exercises,
		},
		{
			route: "/practices/",
			controller: practices,
		},
		{
			route: "/users/",
			controller: users,
		}
	],
	auth
);
