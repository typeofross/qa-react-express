export default class ValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.name = "CustomValidationError";
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}