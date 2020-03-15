import { RouteBuilder } from "../utils";
import V1 from "./v1";
import auth from "./auth";
import open from "./open";

export default RouteBuilder.joinRouters([
    {
        route: "/v1/",
        controller: V1
    },
    {
        route: "/auth/",
        controller: auth
    },
    {
        route: "/open/",
        controller: open
    }
]);