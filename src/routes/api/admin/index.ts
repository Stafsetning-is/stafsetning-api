import users from "./users";
import { auth } from "./utils";
import { RouteBuilder } from "../../utils";

export default RouteBuilder.joinRouters(
	[
		{
			route: "/users/",
			controller: users,
		},
	],
	auth
);
