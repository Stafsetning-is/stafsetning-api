import createNew from "./post.ts";
import byDifficulty from "./by_difficulty"
import { RouteBuilder } from "../../../utils"

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
])

