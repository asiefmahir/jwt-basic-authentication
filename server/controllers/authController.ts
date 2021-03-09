// Dependencies
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import catchAsync from "../utils/catchAsync";
import { loginSchema, signupSchema } from "../validation";
import User from "./../models/userModel";
import AppError from "./../utils/appError";

/**
 * @name signToken
 * @return {String} id
 */
const signToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

/**
 * @export
 * @name signup
 * @param {Request} req
 * @param {Response} res
 */
export const signup = catchAsync(async (req: Request, res: Response) => {
	const { error, value } = signupSchema.validate({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	
	if (!error) {
		await User.create({
			name: value.name,
			email: value.email,
			password: value.password,
		});
		res.json({
			message: "Signup successfully",
		});
	}

	res.json({
		message: error,
	});
});

/**
 * @export
 * @name login
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const login = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		const { error } = loginSchema.validate({
			email: email,
			password: password,
		});

		if (!error) {
			const user: any = await User.findOne({
				email,
			}).select("+password");

			const token = signToken(user._id);

			// Remove password from output
			user.password = undefined;

			res.json({
				status: "success",
				token,
				data: {
					user,
				},
			});
		}

		res.json({
			message: error,
		});
	}
);

/**
 * @export
 * @name protect
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const protect = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// 1) Getting token and check of it's there
		let token;
		if (req.headers.authorization) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			return next(
				new AppError(
					"You are not logged in! Please log in to get access.",
					401
				)
			);
		}

		const decoded: any = await promisify(jwt.verify)(
			token,
			// @ts-ignore
			process.env.JWT_SECRET
		);

		// 3) Check if user still exists
		const currentUser = await User.findById(decoded.id);
		if (!currentUser) {
			return next(
				new AppError(
					"The user belonging to this token does no longer exist.",
					401
				)
			);
		}

		// GRANT ACCESS TO PROTECTED ROUTE
		// @ts-ignore
		req.user = currentUser;
		res.locals.user = currentUser;
		next();
	}
);
