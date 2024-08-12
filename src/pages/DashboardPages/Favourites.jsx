import React, {useEffect, useState} from "react";
import {MY_FAVOURITES_RECIPE_URL, RECIPE_URL} from "../../constants/index.jsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import {useNavigate} from "react-router-dom";
import {faPowerOff, faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RecipeCard from "../../components/DashboardComponents/RecipeCard.jsx";

function FavouritesPage() {

    const [myFavourites, setMyFavourites] = useState();

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const controller = new AbortController();

        const getMyFavourites = async () => {
            try {
                const response = await axiosPrivate.get(MY_FAVOURITES_RECIPE_URL, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setMyFavourites(response.data.sort(() => Math.random() - 0.5));
            }catch(err) {
                console.log(err);
                if (err.name === 'CanceledError') {
                    console.log('Request canceled :', err.message);
                } else {
                    console.log(err.message);
                    navigate('/login', {
                        state: { from: location },
                        replace: true
                    });
                }
            }
        }
        getMyFavourites();
        return () =>{
            isMounted = false;
            controller.abort();
        }
    }, []);


    return (
        <div className="recipes-container">
            <div className="head">
                <h2>Your favourites recipe</h2>
                <p>Your favourites recipe appear here </p>
            </div>
            {myFavourites?.length
                ? myFavourites.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe}/>
                )) : (
                    <div className="no">
                        <FontAwesomeIcon className="quest" icon={faQuestion}/>
                        <h1 className="noRecipe">No favourites recipes</h1>
                    </div>)

            }
        </div>
    )
}

export default FavouritesPage;