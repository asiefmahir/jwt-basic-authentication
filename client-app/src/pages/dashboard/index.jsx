import { useContext } from "react";
import { logOut } from "../../actions";
import { AppContext } from "../../context";

/**
 * @component DashBoard
 */
const DashBoard = () => {
	const { dispatch } = useContext(AppContext);

	return (
		<div>
			<h2>I am DashBoard</h2>
			<button onClick={() => logOut(dispatch)}>Logout</button>
		</div>
	);
};

export default DashBoard;
