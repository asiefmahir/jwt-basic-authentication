const Joi = require("joi");

/**
 * @export
 * @name signupSchema
 */
export const signupSchema = Joi.object({
	name: Joi.string().min(4).max(15).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.required(),
	password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
		.required(),
}).options({ abortEarly: false });

/**
 * @export
 * @name loginSchema
 */
export const loginSchema = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.required(),
	password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
		.required(),
}).options({ abortEarly: false });
