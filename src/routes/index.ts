import { RouteBuilder } from "./utils";
import Api from "./api";

export default RouteBuilder.joinRouters([
    {
        route: "/api/",
        controller: Api
    },
    {
        route: "/open_api/",
        controller: Api
    },
    {
        route: "/web_hooks/",
        controller: Api
    }
]);