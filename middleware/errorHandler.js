const {error} = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode? res.statusCode:500;

    switch(statusCode){
        case error.VALIDATION_ERROR:
            res.status(statusCode).json({
                title:"Validation Error",
                message:err.message,
                stack:err.stack
            });
            break;
        case error.SERVER_ERROR:
            res.status(statusCode).json({
                title:"Server Error",
                message:err.message,
                stack:err.stack
            });
            break;
        case error.NOT_FOUND:
            res.status(statusCode).json({
                title:"Not Found",
                message:err.message,
                stack:err.stack
            });
            break;
        case error.UNAUTHORIZED:
            res.status(statusCode).json({
                title:"Unauthorized",
                message:err.message,
                stack:err.stack
            });
            break;
        case error.FORBIDDEN:
            res.status(statusCode).json({
                title:"Forbidden",
                message:err.message,
                stack:err.stack
            });
            break;
        default:
            res.status(statusCode).json({
                title:"No Error, All good!",
                message:err.message,
                stack:err.stack
            });
            break;
    }
};

module.exports = errorHandler;