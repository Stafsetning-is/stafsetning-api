import auth from "./auth";
import changeDifficulty from "./change_difficulty";
import getDifficulty from "./get_difficulty";
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
]);
