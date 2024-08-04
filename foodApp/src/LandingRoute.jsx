import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import Navbar from "./components/LandingComponents/NavBar.jsx";
import Footer from "./components/LandingComponents/Footer.jsx";

import Home from "./pages/LandingPages/Home.jsx";
import Settings from "./pages/LandingPages/Settings.jsx";
import Login from "./pages/LandingPages/Login.jsx";
import Signup from "./pages/LandingPages/Signup.jsx";
import "./styles/index.scss"


function LandingRoute() {
    return (
        <>
            <Navbar />
            <div className="container main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default LandingRoute;
