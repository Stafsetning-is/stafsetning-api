import getRandom from "./get_random";
import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/",
		controller: getRandom,
		method: "get",
	}
]);
