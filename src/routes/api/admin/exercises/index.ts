import create from "./create";
import update from "./update";

import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: create,
		method: "post",
	},
	{
		route: "/update",
		controller: update,
		method: "post",
	},
]);
