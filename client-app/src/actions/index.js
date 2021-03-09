import jwtDecode from "jwt-decode";

import { axiosInstance } from "../axios";
import setAuthToken from "../utils/setAuthToken";

/**
 * @exports
 * @name signUp
 * @param {*} dispatch 
 * @param {Object} credentials 
 */
export const signUp = async (dispatch, credentials) => {
	const response = await axiosInstance.post("/signup", credentials);
	dispatch({ type: "SIGN_UP", payload: response });
};

/**
 * @exports
 * @name logIn
 * @param {*} dispatch 
 * @param {*} credentials 
 * @param {Function} cb 
 */
export const logIn = async (dispatch, credentials, cb) => {
	const { data } = await axiosInstance.post("/login", credentials);
	if (data && data.token) {
		localStorage.setItem(
			"auth_token",
			JSON.stringify(`Bearer ${data.token}`)
		);
		setAuthToken(localStorage.getItem("auth_token"));
		let { id } = jwtDecode(data.token);
		cb(data.token);
		dispatch({
			type: "LOG_IN",
			payload: {
				token: data.token,
				user: id,
				errors: {},
			},
		});
	}
};

/**
 * @exports
 * @name setUser
 * @param {*} dispatch 
 * @param {*} user 
 */
export const setUser = (dispatch, user) => {
	dispatch({ type: "SET_USER", payload: user });
};

/**
 * @exports
 * @name logOut
 * @param {*} dispatch 
 */
export const logOut = (dispatch) => {
	localStorage.removeItem("auth_token");
	dispatch({ type: "LOG_OUT" });
};
