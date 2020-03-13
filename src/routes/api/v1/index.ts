import featuredExercises from "./featured_exercises";
import { RouteBuilder } from "../../utils"

export default RouteBuilder.routerForEndpoints([
    {
        route: "/featured_exercises/",
        controller: featuredExercises,
        method: "get"
    },
    {
        route: "/some_other_url/",
        controller: featuredExercises,
        method: "get"
    }
])