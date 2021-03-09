/**
 * @class AppError
 * @extends Error
 */
class AppError extends Error {
	isOperational: boolean;
	status: string;
	statusCode: any;
	constructor(message: any, statusCode: any) {
		super(message);

		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;