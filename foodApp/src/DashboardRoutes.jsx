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
import PersistLogin from "./components/DashboardComponents/PersistLogin.jsx";
import RecipeView from "./pages/DashboardPages/RecipeView.jsx";

function DashboardRoutes() {
    return (
        <>
            <Header/>
            <div className="container main">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/recipe/:id" element={<RecipeView/>}/>
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
