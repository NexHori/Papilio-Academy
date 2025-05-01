import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import FigureCard from "./FigureCard";
import "./Figure.css";

const FigureGrid = ({ figurines, disableScroll = false, onRemove }) => {
	const [visibleCount, setVisibleCount] = useState(disableScroll ? figurines.length : 10);

	useEffect(() => {
		if (disableScroll) return;

		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
				visibleCount < figurines.length
			) {
				setVisibleCount((prev) => prev + 5);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [disableScroll, visibleCount, figurines.length]);

	useEffect(() => {
		if (
			!disableScroll &&
			figurines.length > visibleCount &&
			document.documentElement.scrollHeight <= window.innerHeight
		) {
			setVisibleCount((prev) => prev + 5);
		}
	}, [disableScroll, visibleCount, figurines.length]);

	return (
		<div className="Figure">
			<div className="grid">
				{figurines.slice(0, visibleCount).map((figurine) => (
					<FigureCard key={figurine.id} figurine={figurine} onRemove={onRemove} />
				))}
			</div>
			{visibleCount < figurines.length && (
				<div className="load">
					<p className="design"></p>
				</div>
			)}
		</div>
	);
};

export default FigureGrid;
