import RecipeForm from "../../components/DashboardComponents/RecipeForm.jsx";
import {RECIPE_URL} from "../../constants/index.jsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import {useNavigate} from "react-router-dom";

export default function NewRecipePage() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const handleFormSubmit = async (formData) => {
        try {
            const response = await axiosPrivate.post(
                RECIPE_URL,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                },);
            console.log('Recette soumise:', response.data);
           navigate('/dash/my-recipes');

        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
        }
    }
    return (
        <>
            <div className="form-container">
                <div className="head">
                    <h2>Create a recipe</h2>
                    <p>Add your favorite recipes to our collection.</p>
                </div>
                <RecipeForm onSubmit={handleFormSubmit}  />
            </div>
        </>
    )
}