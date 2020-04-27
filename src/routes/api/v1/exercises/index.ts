import byDifficulty from "./by_difficulty";
import getById from "./get_by_id";
import complete from "./complete";
import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/by_difficulty/",
		controller: byDifficulty,
		method: "get",
	},
	{
		route: "/:id",
		controller: getById,
		method: "get",
	},
	{
		route: "/complete",
		controller: complete,
		method: "post",
	},
]);
