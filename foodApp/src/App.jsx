import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import Navbar from "./components/NavBar.jsx"
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Recipes from "./pages/Recipes.jsx";
import Recipe from "./pages/Recipe.jsx";
import Settings from "./pages/Settings.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/recipe" element={<Recipe />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    )
}

export default App;
