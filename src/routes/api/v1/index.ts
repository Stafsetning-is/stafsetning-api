import exercises from "./exercises";
import users from "./users";

import { RouteBuilder, auth } from "../../utils";

export default RouteBuilder.joinRouters([
    {
        route: "/exercises/",
        controller: exercises
    },
    {
        route: "/users/",
        controller: users
    },
], auth);