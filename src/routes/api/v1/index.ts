<<<<<<< HEAD
import exercises from "./exercises"
import practices from "./practices"
import { RouteBuilder, auth } from "../../utils"
=======
import exercises from "./exercises";
import users from "./users";

import { RouteBuilder, auth } from "../../utils";
>>>>>>> dev

export default RouteBuilder.joinRouters([
    {
        route: "/exercises/",
        controller: exercises
    },
    {
<<<<<<< HEAD
        route: "/practices/",
        controller: practices
    },
], auth)
=======
        route: "/users/",
        controller: users
    },
], auth);
>>>>>>> dev
