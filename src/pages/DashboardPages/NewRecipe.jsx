import RecipeForm from "../../components/DashboardComponents/RecipeForm.jsx";
import {RECIPE_URL} from "../../constants/index.jsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import {useNavigate, useParams} from "react-router-dom";

export default function NewRecipePage() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { id } = useParams();
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
    const handleFormUpdate = async (formData) => {

        try {
            const response = await axiosPrivate.put(
                RECIPE_URL+'/'+id,
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
                    <h2>{id ? "Edit your recipe" : "Create a recipe"}</h2>
                    {!id ? <p>Add your favorites recipes to our collection.</p> :
                        <p>De nouvelles idées?</p>}
                </div>
                <div className="formcontent">
                    <RecipeForm onSubmit={!id?handleFormSubmit: handleFormUpdate}/>
                </div>
            </div>
        </>
    )
}