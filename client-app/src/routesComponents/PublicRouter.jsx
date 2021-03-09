import { Router } from "@reach/router";

import LogIn from "../pages/login";
import SignUp from "../pages/sign-up";
import Home from "../pages/home";

/**
 * @component PublicRouter
 */
const PublicRouter = () => {
	return (
		<Router>
			<Home path='/' />
			<LogIn path='/login' />
			<SignUp path='/signup' />
		</Router>
	);
};

export default PublicRouter;