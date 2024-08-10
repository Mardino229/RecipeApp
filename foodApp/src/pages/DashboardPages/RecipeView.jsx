import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";

export default function RecipeView() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getRecipe = async () => {
            try {
                const response = await axiosPrivate.get(`/recipe/${id}`, {
                    signal: controller.signal
                });
                setSuccess(true);
                console.log(response.data);
                if (isMounted) {
                    setRecipe(response.data);
                }
            } catch (err) {
                console.log(err);
                if (err.name === 'CanceledError') {
                    console.log('Requête annulée :', err.message);
                } else {
                    console.log(err.message);
                }
            }
        };

        getRecipe();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [id, axiosPrivate]);

    return (
        <div className="recipe-container section">
            <div className="preview">
                <h1 className="title">{recipe?.title}</h1>
                <p>{recipe?.description}</p>
            </div>

            <div className="recipe-content">
                <div className="recipe-image">
                    {recipe?.imageUrl ? (
                        <img src={`http://localhost:9084/${recipe.imageUrl}`} alt={recipe?.title || "Recipe Image"} />
                    ) : (
                        <p>Image not available</p>
                    )}
                </div>
                <div className="recipe-ingredients">
                    <h2>Ingrédients</h2>
                    <ul>
                        {recipe?.ingredients?.length
                            ? recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.name}</li>
                            )) : <li>No ingredients available</li>
                        }
                    </ul>
                </div>
            </div>

            <div className="recipe-preparation">
                <h2>Steps of the preparation</h2>
                {recipe?.steps?.length
                    ? recipe.steps.map((step, index) => (
                        <div className="step" key={index}>
                            <h3><span className="step-number">{step.number}</span></h3>
                            <div>
                                <h3>{step.name}</h3>
                                <p>{step.description}</p>
                            </div>
                        </div>
                    )) : <p>No steps available</p>
                }
            </div>
        </div>
    );
}
