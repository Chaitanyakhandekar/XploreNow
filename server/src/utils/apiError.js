export class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went Wrong",
        error=[],
        stack=""
    ){
        super(message)
        this.statusCode = statusCode,
        this.message = message,
        this.error = error,
        this.stack = stack
        this.success=false
    }
}   