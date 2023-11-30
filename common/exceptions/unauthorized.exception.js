import { HTTP_STATUS_CODE } from "../helpers/constants.helper";
import GeneralError from "./general-error";

class UnauthorizedException extends GeneralError {
    constructor(message) {
        super();
        this.message = message || "Unauthenticated.";
        this.statusCode = HTTP_STATUS_CODE.UNAUTHORIZE;
    }
}

export default UnauthorizedException;
