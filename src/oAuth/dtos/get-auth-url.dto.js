import Joi from "joi";

export default Joi.object({
    firstName: Joi.string().required().messages({
        "string.empty": "The first name field is required.",
    }),
    lastName: Joi.string().required().messages({
        "string.empty": "The last name field is required.",
    }),
    jobTitle: Joi.string().required().messages({
        "string.empty": "The job title field is required.",
    }),
    country: Joi.string().required().messages({
        "string.empty": "The country field is required.",
    }),
    businessEmail: Joi.string().required().messages({
        "string.empty": "The business email field is required.",
    }),
    company: Joi.string().required().messages({
        "string.empty": "The company field is required.",
    }),
    number: Joi.string().required().messages({
        "string.empty": "The number field is required.",
    }),
});
