import post from "./post";
import getByUser from "./get_by_user";
import getRandom from "./get_random";
import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: post,
		method: "post",
	},
	{
		route: "/",
		controller: getByUser,
		method: "get",
	},
	{
		route: "/:id/proverb",
		controller: getRandom,
		method: "get"
	}
]);
