import { useContext } from "react";
import { Redirect, Router } from "@reach/router";

import { AppContext } from "../context";
import Dahsboard from "../pages/dashboard";
import setAuthToken from "../utils/setAuthToken";

/**
 * @component PrivateRouter
 */
const PrivateRouter = () => {
	const { state } = useContext(AppContext);

	if (state && !state?.token && !state?.user) {
		return <Redirect to='/login' noThrow />;
	}

	setAuthToken(localStorage.getItem("auth_token"));

	return (
		<Router>
			<Dahsboard path='/dashboard' />
		</Router>
	);
};

export default PrivateRouter;
