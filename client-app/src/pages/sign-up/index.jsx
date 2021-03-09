import { useState, useContext } from "react";
import { navigate } from "@reach/router";

import { signUp } from "../../actions";
import { AppContext } from "../../context";

/**
 * @component SignUp
 */
const SignUp = () => {
	const { dispatch } = useContext(AppContext);
	const [fields, setFields] = useState({
		name: "",
		email: "",
		password: "",
	});
	
	const handleChange = (e) => {
		setFields({ ...fields, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		signUp(dispatch, fields);
		navigate("/login");
	};
	return (
		<div className='container'>
			<div className='form-container'>
				<div className='form-title'>
					<div className='title-text'>
						<h1 className='title-main'>Sign Up</h1>
						<p className='title-sub'>It's quick and easy</p>
					</div>

					<span className='title-cross-button'>
						<i className='fas fa-times'></i>
					</span>
				</div>
				<div className='form-container-upper-section'>
					<form className='main-form'>
						<div className='name-input input-wrapper'>
							<input
								type='text'
								name='name'
								className='input-box full-size'
								placeholder='Name'
								required
								onChange={handleChange}
							/>
						</div>

						<div className='email-input input-wrapper'>
							<input
								type='email'
								name='email'
								className='input-box full-size'
								placeholder='Email address'
								required
								onChange={handleChange}
							/>
						</div>

						<div className='password-input input-wrapper'>
							<input
								type='password'
								name='password'
								className='input-box full-size'
								placeholder='Set password'
								required
								onChange={handleChange}
							/>
						</div>

						<div className='sign-up full-size'>
							<input
								className='sign-up-button'
								type='submit'
								value='Sign Up'
								onClick={handleSubmit}
							/>
						</div>
					</form>
				</div>
				<form action=''>
					<input
						type='submit'
						value='Log In'
						className='input-box submit-button'
						style={{ backgroundColor: "#1877f2" }}
						onClick={() => navigate("/login")}
					/>
				</form>
			</div>
			<div className='error-message'></div>
		</div>
	);
};

export default SignUp;
