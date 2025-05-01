import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import FigureGrid from "./FigureGrid";
import "./Collection.css";

const Collection = () => {
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch("http://127.0.0.1:8000/collection/collection/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        navigate("/login");
                    }
                    throw new Error("Failed to fetch collection");
                }

                const data = await response.json();
                setCollection(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching collection:", error);
                setLoading(false);
            }
        };

        fetchCollection();
    }, [navigate]);

    const removeFromCollection = async (figurineId) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(
                `http://127.0.0.1:8000/collection/collection/remove/${figurineId}/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to remove from collection");

            setCollection(collection.filter((item) => item.id !== figurineId));
        } catch (error) {
            console.error("Error removing from collection:", error);
        }
    };

    if (loading) return <p>Loading collection...</p>;

    return (
        <div className="Collection">
            <Helmet>
                <title>My Collection - Papilio Figures</title>
            </Helmet>
            <h1>My Collection</h1>
            {collection.length > 0 ? (
                <FigureGrid
                    figurines={collection}
                    disableScroll={true}
                    onRemove={removeFromCollection}
                />
            ) : (
                <p>Your collection is empty.</p>
            )}
        </div>
    );
};

export default Collection;