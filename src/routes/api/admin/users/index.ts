import makeAdmin from "./make_admin";
import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/:uid/make_admin",
		controller: makeAdmin,
		method: "post",
	},
]);
