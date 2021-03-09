import { NextFunction, Request, Response } from "express";
import AppError from "./../utils/appError";

/**
 * @name handleCastErrorDB
 * @param {any} err
 */
const handleCastErrorDB = (err: any) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

/**
 * @name handleDuplicateFieldsDB
 * @param {any} err
 */
const handleDuplicateFieldsDB = (err: any) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new AppError(message, 400);
};

/**
 * @name handleValidationErrorDB
 * @param {any} err
 */
const handleValidationErrorDB = (err: any) => {
	const errors = Object.values(err.errors).map((el: any) => el.message);

	const message = `Invalid input data. ${errors.join(". ")}`;
	return new AppError(message, 400);
};

/**
 * @name handleJWTError
 */
const handleJWTError = () =>
	new AppError("Invalid token. Please log in again!", 401);

/**
 * @name handleJWTExpiredError
 */
const handleJWTExpiredError = () =>
	new AppError("Your token has expired! Please log in again.", 401);

/**
 * @name sendErrorDev
 * @param {any} err
 * @param {Request} req
 * @param {Response} res
 */
const sendErrorDev = (err: any, req: Request, res: Response) => {
	// A) API
	if (req.originalUrl.startsWith("/api")) {
		return res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	}

	// B) RENDERED WEBSITE
	console.error("ERROR 💥", err);
	return res.status(err.statusCode).render("error", {
		title: "Something went wrong!",
		msg: err.message,
	});
};

/**
 * @name sendErrorProd
 * @param {any} err
 * @param {Request} req
 * @param {Response} res
 */
const sendErrorProd = (err: any, req: Request, res: Response) => {
	// A) API
	if (req.originalUrl.startsWith("/api")) {
		// A) Operational, trusted error: send message to client
		if (err.isOperational) {
			return res.status(err.statusCode).json({
				status: err.status,
				message: err.message,
			});
		}
		// B) Programming or other unknown error: don't leak error details
		// 1) Log error
		console.error("ERROR 💥", err);
		// 2) Send generic message
		return res.status(500).json({
			status: "error",
			message: "Something went very wrong!",
		});
	}

	// B) RENDERED WEBSITE
	// A) Operational, trusted error: send message to client
	if (err.isOperational) {
		return res.status(err.statusCode).render("error", {
			title: "Something went wrong!",
			msg: err.message,
		});
	}
	// B) Programming or other unknown error: don't leak error details
	// 1) Log error
	console.error("ERROR 💥", err);
	// 2) Send generic message
	return res.status(err.statusCode).render("error", {
		title: "Something went wrong!",
		msg: "Please try again later.",
	});
};

/**
 * @export
 * @param {any} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export default (err: any, req: Request, res: Response, next: NextFunction) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, req, res);
	} else if (process.env.NODE_ENV === "production") {
		let error = { ...err };
		error.message = err.message;

		if (error.name === "CastError") error = handleCastErrorDB(error);
		if (error.code === 11000) error = handleDuplicateFieldsDB(error);
		if (error.name === "ValidationError")
			error = handleValidationErrorDB(error);
		if (error.name === "JsonWebTokenError") error = handleJWTError();
		if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

		sendErrorProd(error, req, res);
	}
};
