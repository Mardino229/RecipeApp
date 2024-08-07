import PreviousSearches from "../../components/LandingComponents/PreviousSearches.jsx";
import RecipeCard from "../../components/DashboardComponents/RecipeCard.jsx";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import {CHIEF_URL, RECIPE_URL} from "../../constants/index.jsx";
import {useLocation, useNavigate} from "react-router-dom";
export default function Home(){

    //         authorImg: "/img/top-chiefs/img_5.jpg",
    //     }
    // ].sort(() => Math.random() - 0.5)

    const [recipes, setRecipe] = useState();
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
                isMounted && setRecipe(response.data);
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
        <div>
            <PreviousSearches />
            <div className="recipes-container">
                {recipes?.length
                ? recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe}/>
                    )) : <h1>No recipes</h1>
                }
            </div>
        </div>
    )
}

