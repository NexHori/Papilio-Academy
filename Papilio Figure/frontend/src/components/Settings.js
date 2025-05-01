import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./Settings.css";

const currencyOptions = {
	JPY: { rate: 1, symbol: "¥" },
	USD: { rate: 0.0067, symbol: "$" },
	EUR: { rate: 0.0062, symbol: "€" },
	PHP: { rate: 0.38, symbol: "₱" },
};

const Settings = () => {
	const [currency, setCurrency] = useState(localStorage.getItem("currency") || "JPY");

	useEffect(() => {
		localStorage.setItem("currency", currency);
	}, [currency]);

	return (
		<div className="Settings">
			<Helmet>
				<title>Settings - Papilio Figures</title>
			</Helmet>
			<h1>Settings</h1>

			<div className="card">
				<h2>Currency Preferences</h2>
				<p className="note">Choose the currency you'd like prices to be shown in throughout the site.</p>

				<select value={currency} onChange={(e) => setCurrency(e.target.value)}>
					{Object.keys(currencyOptions).map((cur) => (
						<option key={cur} value={cur}>
							{currencyOptions[cur].symbol} {cur}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Settings;
