import { NextFunction, Request, Response } from "express";

/**
 * @export
 * @param {any} fn
 */
export default (fn: any) => {
	/**
	 * @param {Request} req 
	 * @param {Response} res 
	 * @param {NextFunction} next
	 */
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};
