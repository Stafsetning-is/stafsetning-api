import exersiceSample from "./exercise_sample";
import { RouteBuilder } from "../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/exercise_sample/",
		controller: exersiceSample,
		method: "get",
	},
]);
