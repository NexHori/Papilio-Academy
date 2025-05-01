import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Account.css";

const AccountRegister = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		try {
			const response = await fetch("http://127.0.0.1:8000/accounts/register/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password })
			});
			
			if (!response.ok) {
				throw new Error("Registration failed.");
			}

			navigate("/login");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="Account">
			<Helmet>
				<title>Sign up - Papilio Figures</title>
			</Helmet>
			<h2>Create an Account</h2>
			{error && <p className="error-message">{error}</p>}
			<form onSubmit={handleRegister}>
				<div className="input-field">
					<label>Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username"
						required
					/>
				</div>
				
				<div className="input-field">
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						required
					/>
				</div>
				
				<div className="input-field">
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						required
					/>
				</div>
				
				<div className="input-field">
					<label>Confirm Password</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm your password"
						required
					/>
				</div>
				
				<button type="submit">Register</button>
			</form>
			<p>
				Already have an account? <a href="/login">Login here</a>
			</p>
		</div>
	);
};

export default AccountRegister;
