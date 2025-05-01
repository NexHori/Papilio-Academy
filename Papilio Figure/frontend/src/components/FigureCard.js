import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FigureCard = ({ figurine, onRemove }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;

	const isWishlist = path.includes("/wishlist");
	const isCollection = path.includes("/collection");

	const currency = localStorage.getItem("currency") || "JPY";
	const rates = {
		JPY: { rate: 1, symbol: "¥" },
		USD: { rate: 0.0067, symbol: "$" },
		EUR: { rate: 0.0062, symbol: "€" },
		PHP: { rate: 0.38, symbol: "₱" },
	};

	const convertedPrice = (figurine.price * rates[currency].rate).toFixed(2);
	const symbol = rates[currency].symbol;

	const handleClick = () => {
		navigate(`/figurine/${figurine.id}`);
	};

	return (
		<div className="Figure">
			<div className="card" onClick={handleClick}>
				<img
					src={
						figurine.image.startsWith("http") || figurine.image.startsWith("/media/")
							? `http://127.0.0.1:8000${figurine.image}`
							: `http://127.0.0.1:8000/media/${figurine.image}`
					}
					alt={figurine.name}
				/>

				<p className="name">{figurine.name}</p>

				<div className="container">
					{(isWishlist || isCollection) && onRemove ? (
						<button
							className="button"
							onClick={(e) => {
								e.stopPropagation();
								onRemove(figurine.id);
							}}
						>
							Remove
						</button>
					) : (
						<span className="button tag">{symbol}{convertedPrice}</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default FigureCard;