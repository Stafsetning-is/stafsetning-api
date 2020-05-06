import create from "./create";

import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: create,
		method: "post",
	},
]);
