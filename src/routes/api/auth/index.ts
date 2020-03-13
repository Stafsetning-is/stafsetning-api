import logIn from "./log_in";
import signUp from "./sign-up";
import { RouteBuilder } from "../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/log_in/",
		controller: logIn,
		method: "post"
	},
	{
		route: "/sign_up/",
		controller: signUp,
		method: "post"
	}
]);
