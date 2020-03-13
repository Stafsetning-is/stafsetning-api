import exercises from "./exercises"
import { RouteBuilder, auth } from "../../utils"

export default RouteBuilder.joinRouters([
    {
        route: "/exercises/",
        controller: exercises
    },
], auth)