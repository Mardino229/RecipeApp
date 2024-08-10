import PreviousSearches from "../../components/LandingComponents/PreviousSearches.jsx";
import RecipeCard from "../../components/DashboardComponents/RecipeCard.jsx";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import {RECIPE_CHIEF_URL, RECIPE_URL} from "../../constants/index.jsx";
import RecipeOwn from "../../components/DashboardComponents/RecipeOwn.jsx";

export default function MyRecipesPage() {

    const [recipesChief, setRecipeChief] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;

        const controller = new AbortController();

        const getRecipe = async () => {
            try {
                const response = await axiosPrivate.get(RECIPE_CHIEF_URL, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setRecipeChief(response.data);
            }catch(err) {
                console.log(err);
                if (err.name === 'CanceledError') {
                    console.log('Requête annulée :', err.message);
                } else {
                    console.log(err.message);
                    navigate('/login', {
                        state: { from: location },
                        replace: true
                    });
                }
            }
        }
        getRecipe();
        return () =>{
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <div className="recipes-container">
            <div className="head">
                <h2>Create your own recipes</h2>
                 <p>Recipes created by you appear here </p>
            </div>
            <div className="add">
                <Link to="/dash/new-recipe">
                    <button><FontAwesomeIcon icon={faPlus}/> <span>Ajouter une nouvelle recette</span></button>
                </Link>
            </div>
            {/* <RecipeCard /> */}
            {recipesChief?.length
                ? recipesChief.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe}/>
                )) : <h1>No recipes</h1>
            }
        </div>
    )
}