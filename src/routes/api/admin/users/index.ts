import makeAdmin from "./make_admin";
import exercises from "./exercises";
import inviteList from "./get_invite_list";

import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/:uid/make_admin",
		controller: makeAdmin,
		method: "post",
	},
	{
		route: "/exercises/",
		controller: exercises,
		method: "get",
	},
	{
		route: "/invite_list/",
		controller: inviteList,
		method: "get",
	},
]);
