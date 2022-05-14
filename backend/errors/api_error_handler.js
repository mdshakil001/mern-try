const ApiError = require("./ApiError");

function apiErrorHandler(err, req, res, next) {
    console.log(err);

    if (err instanceof ApiError) { 
        res.status(err.code).json(err.message);
    }

    res.status(500).json('something went wrong !');
}
module.exports = apiErrorHandler;