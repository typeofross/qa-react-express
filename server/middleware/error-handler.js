function errorHandler(err, req, res, next) {
    console.error(err);
    const error = format(err);
    res.status(error.code).json({ "status": "error", "message": error.message })
}

function format(err) {
    const errorMap = {
        "SyntaxError": { code: 400, msg: "Invalid input." },
        "CastError": { code: 400, msg: "Invalid input." },
        "CustomValidationError": { code: 400, msg: err.message === "errors" ? err.errors : err.message },
        "JsonWebTokenError": { "invalid token": { code: 401, msg: 'Unauthorized.' } },
        "TokenExpiredError": { "jwt expired": { code: 401, msg: 'Unauthorized.' } },
        "Error": {
            "Page not found.": { code: 404, msg: "Page not found." },
            "Missing request parameters.": { code: 400, msg: "Missing request parameters." },
            "User already exists.": { code: 409, msg: "User already exists." },
            "Incorrect username/password.": { code: 400, msg: "Incorrect username or password." },
            "Unauthorized.": { code: 401, msg: "Unauthorized." },
            "Invalid request.": { code: 400, msg: "Invalid request." },
            "ID not found.": { code: 404, msg: "ID not found." },
            "No posts to show.": { code: 204, msg: "No posts to show." },
            "No categories to show.": { code: 204, msg: "No categories to show." },
            "Invalid input.": { code: 400, msg: "Invalid input." }

        }
    }

    const err1 = errorMap[err.name]?.code ? { code: errorMap[err.name].code, message: errorMap[err.name].msg } : undefined;
    const err2 = errorMap[err.name]?.[err.message]?.code ? { code: errorMap[err.name][err.message].code, message: errorMap[err.name][err.message].msg } : undefined;
    const err3 = { code: 500, message: "Something went wrong." };

    const error = err1 ?? err2 ?? err3;


    return error;
}

export default errorHandler;