import PreviousSearches from "../../components/LandingComponents/PreviousSearches.jsx";
import RecipeCard from "../../components/DashboardComponents/RecipeCard.jsx";
import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import {CHIEF_URL, RECIPE_URL} from "../../constants/index.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
export default function Home(){

    //         authorImg: "/img/top-chiefs/img_5.jpg",
    //     }
    // ].sort(() => Math.random() - 0.5)

    const [recipes, setRecipe] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;

        const controller = new AbortController();

        const getRecipe = async () => {
            try {
                const response = await axiosPrivate.get(RECIPE_URL, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setRecipe(response.data.sort(() => Math.random() - 0.5));
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


    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    return (
        <div>
            <PreviousSearches search={setSearchTerm} />
            <div className="recipes-container">
                {filteredRecipes?.length
                    ? filteredRecipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe}/>
                    )) : <div className="no">
                        <FontAwesomeIcon className="quest" icon={faQuestion}/>
                        <h1 className="noRecipe">No recipes</h1>
                    </div>
                }
            </div>
        </div>
    )
}

