import { HTTP_STATUS_CODE } from "../helpers/constants.helper";
import GeneralError from "./general-error";

class BadRequestException extends GeneralError {
  constructor(message = "Bad Request!") {
    super();
    this.message = message;
    this.statusCode = HTTP_STATUS_CODE.BAD_REQUEST;
  }
}

export default BadRequestException;
