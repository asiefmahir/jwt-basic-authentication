import { useState, useContext } from "react";
import { Link, navigate } from "@reach/router";

import { logIn } from "../../actions";
import { AppContext } from "../../context";

/**
 * @component LogIn
 */
const LogIn = () => {
	const { dispatch } = useContext(AppContext);
	const [fields, setFields] = useState({
		email: "",
		password: "",
	});
	const handleChange = (e) => {
		setFields({ ...fields, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		logIn(dispatch, fields, (token) => {
			if (token) {
				navigate("/dashboard");
			}
		});
	};

	return (
		<div className='container'>
			<div className='form-container'>
				<div className='form-container-upper-section'>
					<form className='form'>
						<input
							type='email'
							name='email'
							className='mail-input input-box'
							placeholder='Email address'
							onChange={handleChange}
						/>
						<input
							type='password'
							name='password'
							className='password-input input-box'
							placeholder='Password'
							onChange={handleChange}
						/>
						<input
							type='submit'
							value='Log In'
							className='input-box submit-button'
							style={{ backgroundColor: "#1877f2" }}
							onClick={handleSubmit}
						/>
					</form>
				</div>

				<div className='new-account-button-section'>
					<Link className='btn-link new-account-link' to='/signup'>
						Create New Account
					</Link>
				</div>
			</div>
			<div className='error-message'></div>
		</div>
	);
};

export default LogIn;
