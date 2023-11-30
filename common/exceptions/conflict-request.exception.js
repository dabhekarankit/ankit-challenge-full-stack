import { HTTP_STATUS_CODE } from "../helpers/constants.helper";
import GeneralError from "./general-error";

class ConflictRequestException extends GeneralError {
    constructor(message) {
        super();
        this.message = message || "Conflict request!";
        this.statusCode = HTTP_STATUS_CODE.CONFLICT;
    }
}

export default ConflictRequestException;
