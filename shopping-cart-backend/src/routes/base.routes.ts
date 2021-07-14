import { Router, RequestHandler } from 'express';

export default abstract class BaseRoute {
    protected router: Router;

    constructor() {
        this.router = Router();
    }

    public abstract init(): Router;

    /**
     * Perform get request
     * @param route
     * @param handlers
     */
    protected get(route: string, ...handlers: RequestHandler[]) {
        this.router.get(route, ...handlers);
    }

    /**
     * Perform post request, often to create new entity
     * @param route
     * @param handlers
     */
    protected post(route: string, ...handlers: RequestHandler[]) {
        this.router.post(route, ...handlers);
    }

    /**
     * Perform put request, often to save existing data
     * @param route
     * @param handlers
     */
    protected put(route: string, ...handlers: RequestHandler[]) {
        this.router.put(route, ...handlers);
    }

    /**
     * Perform delete request, often to delete data
     * @param route
     * @param handlers
     */
    protected delete(route: string, ...handlers: RequestHandler[]) {
        this.router.delete(route, ...handlers);
    }
}
