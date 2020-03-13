import auth from "./auth";
import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
    {
        route: "/auth/",
        controller: auth,
        method: "get"
    }
]);

