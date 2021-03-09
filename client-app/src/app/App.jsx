import jwtDecode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import PrivateRouter from "../routesComponents/PrivateRouter";
import PublicRouter from "../routesComponents/PublicRouter";

if (localStorage.getItem("auth_token")) {
	let decode = jwtDecode(localStorage.getItem("auth_token"));

	if (decode.exp * 1000 > new Date().getTime()) {
		setAuthToken(localStorage.getItem("auth_token"));
	}
}

/**
 * @component App
 */
const App = () => {
	return (
		<>
			<PublicRouter />
			<PrivateRouter />
		</>
	);
};

export default App;
