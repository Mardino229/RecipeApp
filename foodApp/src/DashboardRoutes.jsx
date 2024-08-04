import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import Footer from "./components/LandingComponents/Footer.jsx";

import Home from "./pages/DashboardPages/Home.jsx";
import "./styles/dash.scss"
import Header from "./components/DashboardComponents/Header.jsx";
import MyRecipesPage from "./pages/DashboardPages/MyRecipes.jsx";
import NewRecipePage from "./pages/DashboardPages/NewRecipe.jsx";
import Settings from "./pages/LandingPages/Settings.jsx";
import Recipe from "./pages/DashboardPages/Recipe.jsx";

function DashboardRoutes() {
    return (
        <>
            <Header/>
            <div className="container main">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/recipe" element={<Recipe/>}/>
                    <Route path="/my-recipes" element={<MyRecipesPage/>}/>
                    <Route path="/new-recipe" element={<NewRecipePage/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    )
}

export default DashboardRoutes;
