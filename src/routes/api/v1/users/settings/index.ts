import { RouteBuilder } from "../../../../utils";
import changePassword from "./change_password";
export default RouteBuilder.routerForEndpoints([
    {
        route: "/change_password/",
        controller: changePassword,
        method: "post",
    },
]);
