import CustomImage from "./CustomImage.jsx"
import {Link} from "react-router-dom";

export default function RecipeCard({recipe}){
    return (
        <div className="product-card">
            <img src={recipe.image} alt="{name}" className="product-image"/>
            <h3 className="product-name">{recipe.title}</h3>
            <p className="product-description">{recipe.title}</p>
            <p className="product-price">{recipe.title} BYN</p>
            <div className="product-actions">
                <Link to="/recipe" className="btn">VIEW RECIPE</Link>
            </div>
        </div>
    )
}