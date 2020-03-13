import { RouteBuilder } from "../utils"
import V1 from "./v1";

export default RouteBuilder.joinRouters([
    {
        route: "/v1/",
        controller: V1
    },
    {
        route: "/v2/",
        controller: V1
    }
])