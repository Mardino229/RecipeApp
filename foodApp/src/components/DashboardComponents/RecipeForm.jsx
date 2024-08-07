import { useState } from "react";
import {faTrashCan, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const RecipeForm = ({ onSubmit }) => {

    const [recipe, setRecipe] = useState({
            name: "",
            description: "",
            image: null,
            ingredients: [""],
            instructions: [{ number: 1, name: '', description: '' }],
            });
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            image: file,
        }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients[index] = event.target.value;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: newIngredients,
        }));
    };

    const handleAddIngredient = () => {
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: [...prevRecipe.ingredients, ""],
        }));
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: newIngredients,
        }));
    };

    const handleInstructionChange = (index, event) => {
        const { name, value } = event.target;
        const newInstructions = [...recipe.instructions];
        newInstructions[index][name] = value;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            instructions: newInstructions,
        }));
    };

    const handleAddInstruction = () => {
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            instructions: [...prevRecipe.instructions, { number: prevRecipe.instructions.length + 1, name: '', description: '' }],
        }));
    };

    const handleRemoveInstruction = (index) => {
        const newInstructions = recipe.instructions.filter((_, i) => i !== index);
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            instructions: newInstructions.map((instruction, idx) => ({
                ...instruction,
                number: idx + 1,
            })),
        }));
    };

    const handleView = ()=> {
        console.log(recipe);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('recipe', new Blob([JSON.stringify({
            title: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients,
            steps: recipe.instructions
        })], { type: 'application/json' }));
        formData.append('image', recipe.image);
        console.log(formData)
        onSubmit(formData);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit} encType="multipart/form-data" >
            <div className="form-group">
                <label>Nom :</label>
                <input
                    type="text"
                    value={recipe.name}
                    onChange={handleChange}
                    name="name"
                    placeholder="Name"
                />
            </div>
            <div className="form-group">
                <label>Description :</label>
                <textarea
                    name="description"
                    value={recipe.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
            </div>
            <div className="form-group">
                <label>Image :</label>
                <img
                    src= {imagePreview? imagePreview : "https://placehold.co/600x400" }
                    width={400}
                    height={225}
                    alt="Mushroom Risotto"
                    className="rounded-t-lg object-cover w-full aspect-video"
                />
                <input
                    type="file"
                    name="imageUrl"
                    onChange={handleImageChange}
                />
            </div>
            <div className="group">
                <div className="form-group">
                    <label>Ingrédients :</label>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="data">
                            <input
                                type="text"
                                placeholder={`Ingrédient ${index + 1}`}
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e)}
                            />
                            <FontAwesomeIcon icon={faTrashCan} onClick={() => handleRemoveIngredient(index)}/>
                        </div>

                    ))}
                    <button type="button" onClick={handleAddIngredient}>Ajouter un ingrédient</button>
                </div>
                <div className="form-group">
                    <label>Instructions :</label>
                    {recipe.instructions.map((instruction, index) => (
                        <div key={index} className="data">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={`Name of instruction ${index + 1}`}
                                    value={instruction.name}
                                    onChange={(e) => handleInstructionChange(index, e)}
                                />
                                <textarea
                                    //placeholder={`Instruction ${index + 1}`}
                                    placeholder="Description"
                                    name="description"
                                    value={instruction.description}
                                    onChange={(e) => handleInstructionChange(index, e)}
                                />
                            </div>
                            <FontAwesomeIcon icon={faTrashCan} onClick={() => handleRemoveInstruction(index)}/>
                        </div>
                    ))}
                    <button type="button" className="last" onClick={handleAddInstruction}>Ajouter une instruction
                    </button>
                </div>
            </div>
            <button type="submit" >Enregistrer la recette</button>
        </form>
    );
    }

export default RecipeForm;
