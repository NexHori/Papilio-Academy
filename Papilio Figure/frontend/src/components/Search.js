import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import FigureGrid from "./FigureGrid";
import "./Search.css";

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim() !== "") {
                handleSearch(query);
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleSearch = async (searchTerm) => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`http://127.0.0.1:8000/collection/search/?q=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                throw new Error("Failed to fetch search results.");
            }

            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError(err.message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Search">
            <Helmet>
                <title>Search Figures - Papilio Figures</title>
            </Helmet>
            <h1>Search Figures</h1>

            <div className="bar">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type to search..."
                />
            </div>

            {loading && <p>Searching...</p>}
            {error && <p className="error">{error}</p>}

            {results.length > 0 ? (
                <FigureGrid figurines={results} disableScroll={true} />
            ) : (
                !loading && query && <p>No results found.</p>
            )}
        </div>
    );
};

export default Search;
