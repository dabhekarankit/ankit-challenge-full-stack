import { HTTP_STATUS_CODE } from "../helpers/constants.helper";
import GeneralError from "./general-error";

class UnprocessableException extends GeneralError {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = HTTP_STATUS_CODE.UNPROCESSABLE;
  }
}

export default UnprocessableException;
