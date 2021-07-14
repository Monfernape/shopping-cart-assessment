import { Response, Request, NextFunction } from "express"
import { CustomError } from "./CustomError"

export const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).send({ errors: error.serializeErrors() });
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong' }],
    });
    return;
}