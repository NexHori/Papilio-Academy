import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Details.css";

const Details = () => {
	const { id } = useParams();
	const [figure, setFigure] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchFigureDetails = async () => {
			try {
				const response = await fetch(`http://127.0.0.1:8000/collection/figurines/${id}/`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setFigure(data);
			} catch (err) {
				setError(err.message);
				console.error("Error fetching figure details:", err);
			}
		};

		fetchFigureDetails();
	}, [id]);

	const handleAddTo = async (endpoint) => {
		try {
			const token = localStorage.getItem("authToken");
			if (!token) {
				alert("Please login first");
				navigate("/login");
				return;
			}

			const getCSRFToken = () => {
				return document.cookie
					.split("; ")
					.find((row) => row.startsWith("csrftoken="))
					?.split("=")[1] || "";
			};

			const response = await fetch(`http://127.0.0.1:8000/${endpoint}/${id}/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					"X-CSRFToken": getCSRFToken(),
				},
				credentials: "include",
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || `Failed to add to ${endpoint}`);
			}

			const data = await response.json();
			alert(data.message);
		} catch (error) {
			console.error(`Error in add to ${endpoint}:`, error);
			alert(error.message || "An error occurred. Please try again.");
		}
	};

	const addToCollection = () => handleAddTo("collection/collection/add");
	const addToWishlist = () => handleAddTo("collection/wishlist/add");

	if (error) return <p>Error loading figure details: {error}</p>;
	if (!figure) return <p>Loading figure details...</p>;

	// ✅ Currency Handling
	const currency = localStorage.getItem("currency") || "JPY";
	const rates = {
		JPY: { rate: 1, symbol: "¥" },
		USD: { rate: 0.0067, symbol: "$" },
		EUR: { rate: 0.0062, symbol: "€" },
		PHP: { rate: 0.38, symbol: "₱" },
	};

	const convertedPrice = (figure.price * rates[currency].rate).toFixed(2);
	const symbol = rates[currency].symbol;

	return (
		<div className="Details">
			<Helmet>
				<title>
					{figure.name} {figure.series && ` - ${figure.series}`} - Papilio Figures
				</title>
			</Helmet>
			<div className="details">
				<div className="image">
					<img src={`http://127.0.0.1:8000${figure.image}`} alt={figure.name} />
				</div>

				<div className="info">
					<p className="name">
						{figure.series && `${figure.series} - `}
						{figure.name}
						{figure.scale && ` - ${figure.scale}`}
						{figure.version && ` - ${figure.version} Ver.`}
						{figure.manufacturer && ` (${figure.manufacturer})`}
					</p>

					<p className="price">{symbol}{convertedPrice}</p>

					<div className="buttons">
						<button className="button wishlist" onClick={addToWishlist}>
							Add to Wishlist
						</button>
						<button className="button collection" onClick={addToCollection}>
							Add to Collection
						</button>
					</div>

					<div className="divider">
						<div className="column">
							<div>
								<p className="block">Series</p>
								<p className="detail">{figure.series || "Not Available"}</p>
							</div>

							<div>
								<p className="block">Manufacturer</p>
								<p className="detail">{figure.manufacturer || "Not Available"}</p>
							</div>

							<div>
								<p className="block">Release Date</p>
								<p className="detail">{figure.release_date || "Not Available"}</p>
							</div>
						</div>

						<div className="column">
							<div>
								<p className="block">Category</p>
								<p className="detail">{figure.category || "Not Available"}</p>
							</div>

							<div>
								<p className="block">Scale</p>
								<p className="detail">{figure.scale || "Not Available"}</p>
							</div>

							{figure.version ? (
								<div>
									<p className="block">Version</p>
									<p className="detail">{figure.version}</p>
								</div>
							) : (
								<div />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Details;
