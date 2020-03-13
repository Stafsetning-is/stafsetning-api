import createNew from "./post.ts";
import { RouteBuilder } from "../../../utils"

export default RouteBuilder.routerForEndpoints([
    {
        route: "/",
        controller: createNew,
        method: "post"
    },
])

