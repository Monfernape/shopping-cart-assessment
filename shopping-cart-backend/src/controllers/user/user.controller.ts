import { Request, Response, NextFunction } from 'express';
import { updateUser } from "./update"

export class UserController {

    public static update(req: Request, res: Response, next:NextFunction){
        updateUser(req, res, next)
    }
}