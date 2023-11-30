import GeneralError from "../exceptions/general-error";
import { HTTP_STATUS_CODE } from "../helpers/constants.helper";
import loggerHelper from "../helpers/logger.helper";

export default (err, req, res, next) => {
    console.log(err);
    if (err && err.error && err.error.isJoi) {
        if (err.error.details[0]) {
            return res.status(HTTP_STATUS_CODE.UNPROCESSABLE).json({
                error: true,
                statusCode: HTTP_STATUS_CODE.UNPROCESSABLE,
                message: err.error.details[0].message,
            });
        }
    }

    if (err instanceof GeneralError) {
        return res.status(err.statusCode).json({
            error: true,
            statusCode: err.statusCode,
            message: err.message,
        });
    }

    loggerHelper.error(err);
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            error: true,
            statusCode: err.statusCode,
            message: err.message,
        });
    } else {
        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
            error: true,
            statusCode: HTTP_STATUS_CODE.INTERNAL_SERVER,
            message: err.message,
        });
    }
};
