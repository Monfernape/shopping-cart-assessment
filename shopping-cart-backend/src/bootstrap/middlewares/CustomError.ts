export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract msg: string | undefined

    protected constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): { message: string | undefined; field?: string }[];
}
