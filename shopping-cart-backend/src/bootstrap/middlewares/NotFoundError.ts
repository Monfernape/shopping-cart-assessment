import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
    statusCode = 404;
    msg: string | undefined;

    constructor(message?: string) {
        super('Route not found');
        this.msg = message

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: this.msg ? this.msg :'Not Found' }];
    }
}
