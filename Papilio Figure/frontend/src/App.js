import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import FigureGrid from "./components/FigureGrid";
import FigureDetail from "./components/Details";
import AccountLogin from "./components/AccountLogin";
import AccountRegister from "./components/AccountRegister";
import Wishlist from "./components/Wishlist";
import Collection from "./components/Collection";
import Search from "./components/Search";
import Settings from "./components/Settings";
import "./App.css";

function App() {
    const [figurines, setFigurines] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/collection/figurines/")
        .then((response) => response.json())
        .then((data) => {
            if (typeof data === "string") {
                data = JSON.parse(data);
            }
            if (Array.isArray(data)) {
                setFigurines(data.map((item) => ({ id: item.pk, ...item.fields })));
            }
        })
        .catch(() => {});
    }, []);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    setIsAuthenticated(true);
                    setUsername(localStorage.getItem("username"));
                } catch (err) {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("username");
                    setIsAuthenticated(false);
                }
            }
        };
        verifyToken();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        setUsername("");
    };

    const setAuthenticationState = (authToken, username) => {
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("username", username);
        setIsAuthenticated(true);
        setUsername(username);
    };

    return (
        <HelmetProvider>
            <Router>
                <Header isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout}/>
                <main>
                    <Routes>
                        <Route path="/" element={<FigureGrid figurines={figurines}/>}/>
                        <Route path="/figurine/:id" element={<FigureDetail/>}/>
                        <Route path="/login" element={<AccountLogin setAuthenticationState={setAuthenticationState}/>}/>
                        <Route path="/register" element={<AccountRegister/>}/>
                        <Route path="/wishlist" element={<Wishlist/>}/>
                        <Route path="/collection" element={<Collection/>}/>
						<Route path="/search" element={<Search />} />
						<Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </Router>
        </HelmetProvider>
    );
}

export default App;