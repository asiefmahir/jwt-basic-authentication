import { Request, Response } from "express";
import User from "./../models/userModel"

/**
 * @export
 * @name getAllUsers
 * @param {Request} req
 * @param {Response} res
 */
export const getAllUsers = async (
	req: Request,
	res: Response,
) => {
	const users = await User.find();
	res.json(users);
};