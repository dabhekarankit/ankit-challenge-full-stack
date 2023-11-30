import { createValidator } from "express-joi-validation";
const validator = createValidator({ assError: true });
export default validator;
