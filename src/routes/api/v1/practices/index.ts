import post from "./post";
import getById from "./get_by_id";
import getByUser from "./get_by_user";
import { RouteBuilder } from "../../../utils";

export default RouteBuilder.routerForEndpoints([
    {
        route: "/",
        controller: post,
        method: "post",
    },
    {
        route: "/:id",
        controller: getById,
        method: "get",
    },
    {
        route: "/",
        controller: getByUser,
        method: "get",
    },
]);
