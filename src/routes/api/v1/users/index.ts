import auth from "./auth";
import changeDifficulty from "./change_difficulty";
import getDifficulty from "./get_difficulty";
import saveExercise from "./save_exercise";
import unsaveExercise from "./unsave_exercise";
import getSaved from "./get_saved";
import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/auth/",
		controller: auth,
		method: "get",
	},
	{
		route: "/change_difficulty/",
		controller: changeDifficulty,
		method: "post",
	},

	{
		route: "/get_difficulty/",
		controller: getDifficulty,
		method: "get",
	},
	{
		route: "/exercises/:id/save",
		controller: saveExercise,
		method: "post",
	},
	{
		route: "/exercises/:id/unsave",
		controller: unsaveExercise,
		method: "post",
	},
	{
		route: "/exercises/saved/",
		controller: getSaved,
		method: "get"
	}
]);
