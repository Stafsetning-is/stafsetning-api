import getByUser from "./get_by_user";
import getRandom from "./get_random";
import getById from "./get_by_id";
import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/:id",
		controller: getById,
		method: "get",
	},
	{
		route: "/",
		controller: getByUser,
		method: "get",
	},
	{
		route: "/:id/proverb",
		controller: getRandom,
		method: "get",
	},
]);
