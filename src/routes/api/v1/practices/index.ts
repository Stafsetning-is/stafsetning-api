import post from "./post";
import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
    {
        route: "/",
        controller: post,
        method: "post"
    },
]);

