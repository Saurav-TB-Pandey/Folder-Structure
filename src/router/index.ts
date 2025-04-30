import { businessRoutes } from "./businessRoutes";
import { providerRoutes } from "./providerRoutes";
import { publicRoutes } from "./publicRoutes";

const routes = [...publicRoutes, ...businessRoutes, ...providerRoutes];
export { routes };
