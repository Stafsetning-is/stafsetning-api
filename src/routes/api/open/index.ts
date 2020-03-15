import exersiceSample from "./exercise_sample";
import { RouteBuilder } from "../../utils";

export default RouteBuilder.joinRouters([
    {
        route: "/exercise_sample/",
        controller: exersiceSample
    },
]);