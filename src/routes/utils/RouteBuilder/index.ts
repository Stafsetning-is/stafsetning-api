import { Router } from "express";
import { EndpointObject, RouterObject} from "./interface";

export class RouteBuilder{

    /**
     * Builds routes and returns it
     * @param controllers array of controllers
     */
    public static joinRouters(controllers: RouterObject[]) {
        const router = Router();
        for (const {controller, route} of controllers)
            router.use(route, controller);
        return router;
    }

    /**
     * adds endpoints to a router and returns said router
     * @param endpoints array of endpoint objects
     */
    public static routerForEndpoints(endpoints: EndpointObject[]) {
        const router = Router();
        for (const endp of endpoints) {
            if(endp.middleware)
                router[endp.method](endp.route, endp.middleware, endp.controller);
            else router[endp.method](endp.route, endp.controller);
        }
        return router
    }

}