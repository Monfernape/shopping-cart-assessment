import { CustomError } from './CustomError';

export class BadRequestError extends CustomError {
    statusCode = 400;
    msg: string | undefined;

    constructor(message?: string) {
        super('Route not found');
        this.msg = message

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return { message: this.msg ? this.msg :'Not Found' };
    }
}
