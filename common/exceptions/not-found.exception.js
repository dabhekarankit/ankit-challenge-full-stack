import { HTTP_STATUS_CODE } from "../helpers/constants.helper";
import GeneralError from "./general-error";

class NotFoundException extends GeneralError {
    constructor(message) {
        super();
        this.message = message || "Error: Not Found";
        this.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
    }
}

export default NotFoundException;
