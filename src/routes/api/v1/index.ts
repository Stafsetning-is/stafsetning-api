import exercises from "./exercises"
import { RouteBuilder } from "../../utils"

export default RouteBuilder.joinRouters([
    {
        route: "/exercises/",
        controller: exercises
    },
])