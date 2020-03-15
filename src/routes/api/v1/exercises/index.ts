import createNew from "./post.ts";
import byDifficulty from "./by_difficulty";
import getById from "./get_by_id";
import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
    {
        route: "/",
        controller: createNew,
        method: "post"
    },
    {
        route: "/by_difficulty/",
        controller: byDifficulty,
        method: "get"
    },
    {
        route: "/:id",
        controller: getById,
        method: "get"
    },
]);

