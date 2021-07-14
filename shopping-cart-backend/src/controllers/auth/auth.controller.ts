import { Request, Response, NextFunction } from 'express';
import { login, signup } from "./index";

export class AuthController {

    public static login(req: Request, res: Response, next:NextFunction){
        login(req, res, next)
    }

    public static signUp(req: Request, res: Response, next:NextFunction){
        signup(req, res, next)
    }
}