import { Request, Response, NextFunction } from 'express';
import { updateUser } from "./update"
import { getUser } from "./getUser"

export class UserController {

    public static update(req: Request, res: Response, next:NextFunction){
        updateUser(req, res, next)
    }

    public static get(req: Request, res: Response, next: NextFunction) {
        getUser(req, res, next)
    }
}