import PreviousSearches from "../../components/LandingComponents/PreviousSearches.jsx";
import RecipeCard from "../../components/DashboardComponents/RecipeCard.jsx";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import {CHIEF_URL, RECIPE_URL} from "../../constants/index.jsx";
import {useLocation, useNavigate} from "react-router-dom";
export default function Home(){
    // const recipe = [
    //     {
    //         title: "Chicken Pan Pizza",
    //         image: "/img/gallery/img_1.jpg",
    //         description: "C'est une bonne recette tu y gagneras beaucoup en nutriments",
    //         authorImg: "/img/top-chiefs/img_1.jpg",
    //     },
    //     {
    //         title: "Spaghetti and Meatballs",
    //         image: "/img/gallery/img_4.jpg",
    //         authorImg: "/img/top-chiefs/img_2.jpg",
    //     },
    //     {
    //         title: "American Cheese Burger",
    //         image: "/img/gallery/img_5.jpg",
    //         authorImg: "/img/top-chiefs/img_3.jpg",
    //     },
    //     {
    //         title: "Mutton Biriyani",
    //         image: "/img/gallery/img_6.jpg",
    //         authorImg: "/img/top-chiefs/img_5.jpg",
    //     },
    //     {
    //         title: "Japanese Sushi",
    //         image: "/img/gallery/img_10.jpg",
    //         authorImg: "/img/top-chiefs/img_6.jpg",
    //     },
    //     {
    //         title: "Chicken Pan Pizza",
    //         image: "/img/gallery/img_1.jpg",
    //         authorImg: "/img/top-chiefs/img_1.jpg",
    //     },
    //     {
    //         title: "Spaghetti and Meatballs",
    //         image: "/img/gallery/img_4.jpg",
    //         authorImg: "/img/top-chiefs/img_2.jpg",
    //     },
    //     {
    //         title: "American Cheese Burger",
    //         image: "/img/gallery/img_5.jpg",
    //         authorImg: "/img/top-chiefs/img_3.jpg",
    //     },
    //     {
    //         title: "Mutton Biriyani",
    //         image: "/img/gallery/img_6.jpg",
    //         authorImg: "/img/top-chiefs/img_5.jpg",
    //     },
    //     {
    //         title: "Japanese Sushi",
    //         image: "/img/gallery/img_10.jpg",
    //         authorImg: "/img/top-chiefs/img_6.jpg",
    //     },
    //     {
    //         title: "American Cheese Burger",
    //         image: "/img/gallery/img_5.jpg",
    //         authorImg: "/img/top-chiefs/img_3.jpg",
    //     },
    //     {
    //         title: "Mutton Biriyani",
    //         image: "/img/gallery/img_6.jpg",
    //         authorImg: "/img/top-chiefs/img_5.jpg",
    //     }
    // ].sort(() => Math.random() - 0.5)

    const [recipes, setRecipe] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;

        const controller = new AbortController();

        const getRecipe = async () => {
            try {
                const response = await axiosPrivate.get(RECIPE_URL, {
                    signal: controller.signal,
                });
                console.log(response.data);
                isMounted && setRecipe(response.data);
            }catch(err) {
                console.log(err);
                navigate('/login', { state:
                {
                    from: location
                }, replace: true
            })
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
                    )) : <h1>No recipes </h1>
                }
            </div>
        </div>
    )
}

