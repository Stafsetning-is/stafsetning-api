import create from "./create";
import update from "./update";
import publish from "./publish";
import getByFileName from "./get_by_file_name";

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
	{
		route: "/file_name",
		controller: getByFileName,
		method: "get",
	},
	{
		route: "/:id/publish",
		controller: publish,
		method: "post",
	},
]);
