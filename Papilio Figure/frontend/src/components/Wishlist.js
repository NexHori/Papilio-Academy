import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import FigureGrid from "./FigureGrid";
import "./Wishlist.css";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch("http://127.0.0.1:8000/collection/wishlist/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        navigate("/login");
                    }
                    throw new Error("Failed to fetch wishlist");
                }

                const data = await response.json();
                setWishlist(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [navigate]);

    const removeFromWishlist = async (figurineId) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(
                `http://127.0.0.1:8000/collection/wishlist/remove/${figurineId}/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to remove from wishlist");

            setWishlist(wishlist.filter((item) => item.id !== figurineId));
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    if (loading) return <p>Loading wishlist...</p>;

    return (
        <div className="Wishlist">
            <Helmet>
                <title>My Wishlist - Papilio Figures</title>
            </Helmet>
            <h1>My Wishlist</h1>
            {wishlist.length > 0 ? (
				<FigureGrid
					figurines={wishlist}
					disableScroll={true}
					onRemove={removeFromWishlist}
				/>
            ) : (
                <p>Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default Wishlist;
