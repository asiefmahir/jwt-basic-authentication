import { Document } from "mongoose";

/**
 * @export
 * @interaface ILoginUserResponse
 */
export interface ILoginUserResponse extends Document {
	_id: string;
	name: string;
	email: string;
	password: string;
}

/**
 * @export
 * @interaface IUser
 */
export interface IUser extends Document {
	password: string;
}