import auth from "./auth";
import changeDifficulty from "./change_difficulty";
import saveExercise from "./save_exercise";
import unsaveExercise from "./unsave_exercise";
import savedExercises from "./saved_exercises";
import changePassword from "./change_password";
import editPreferences from "./edit_preferences";
import getTrophies from "./get_trophies";
import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
	{
		route: "/auth/",
		controller: auth,
		method: "get",
	},
	{
		route: "/difficulty",
		controller: changeDifficulty,
		method: "post",
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
		route: "/exercises/saved",
		controller: savedExercises,
		method: "get",
	},
	{
		route: "/password/",
		controller: changePassword,
		method: "post",
	},
	{
		route: "/trophies/",
		controller: getTrophies,
		method: "get",
	},
	{
		route: "/preferences/",
		controller: editPreferences,
		method: "post",
	},
]);
