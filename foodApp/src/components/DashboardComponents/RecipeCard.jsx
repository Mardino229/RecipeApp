import {Link} from "react-router-dom";
import {faHeart, faBookmark} from "@fortawesome/free-regular-svg-icons";
import {faHeart as f} from "@fortawesome/free-solid-svg-icons";
import {faBookmark as fv} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import React from "react";
import {
    FAVOURITE_RECIPE_URL,
    HAS_FAVOURITE_RECIPE_URL, HAS_LIKE_RECIPE_URL,
    LIKE_RECIPE_URL,
    RECIPE_URL,
} from "../../constants/index.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import {axiosPrivate} from "../../services/axios.jsx";

export default function RecipeCard({recipe}){
    const [like, setLike] = useState(true)
    const [nbLike, setNbLike] = useState(recipe.nbLike)

    const [key, setKey] = useState(0);

    const refreshComponent = () => {
        setKey(prevKey => prevKey + 1);
    }
    // const [verify, setVerify] = useState()

    const {auth} = useAuth()

    const [favour, setFavour] = useState(true)
    const [nbFavour, setNbFavour] = useState(recipe.nbFavourite)

    useEffect( () => {
        async function hasLike() {
            try {
                const response = await axiosPrivate.get(
                    HAS_LIKE_RECIPE_URL + recipe.id
                )

                setLike(!response.data)
            } catch (err) {
                console.log(err);
            }
        }
        hasLike()
    }, [recipe.id]);

    useEffect( () => {
        async function hasFavour() {
            try {
                const response = await axiosPrivate.get(
                    HAS_FAVOURITE_RECIPE_URL + recipe.id
                )
                setFavour(!response.data)
            } catch (error) {
                console.log(error);
            }
        }
        hasFavour()
    }, [recipe.id]);

    const deleteRecipe =  async ()=> {
        try {
            await axiosPrivate.delete(
                RECIPE_URL+'/'+recipe.id)
            refreshComponent()
        }catch(err){
            console.log(err)
        }
    }
    const changeLike = async () => {
        try {
            const response = await axiosPrivate.post(
                LIKE_RECIPE_URL + recipe.id,
            )
            setLike(!like)
            if (like) {
                setNbLike(nbLike + 1)
            } else {
                setNbLike(nbLike - 1)
            }
        } catch (err){
            if (err.response.status === 403){
                console.log(err.data?.detail)
            } else {
                console.log(err)
            }
        }

    }
    const changeFavour = async () => {
        try {
            const response = await axiosPrivate.post(
                FAVOURITE_RECIPE_URL+recipe.id,
            )
            setFavour(!favour)
            if (favour) {
                setNbFavour(nbFavour + 1)
            } else {
                setNbFavour(nbFavour - 1)
            }
        } catch (err){
            if (err.response.status === 403){
                console.log(err.data?.detail)
            } else {
                console.log(err)
            }
        }
    }


    return (
    <div className="recipe-card" key={key}>
        <h2 className="recipe-title">{recipe.title}</h2>
        <p className="recipe-description">{recipe.description}</p>
        <div className="recipe-image-container">
            <img src={`http://localhost:9084/${recipe.imageUrl}`} alt={recipe.title} className="recipe-image"/>
        </div>
        {recipe?.chief?.pseudo && <div className="recipe-author">
            <img src="../../../public/img/top-chiefs/author.png"  className="author-image"/>
            <span className="title">Written by {recipe.chief.pseudo}</span>
        </div>}
        <div className="recipe-stats">
            <span className="comments">{favour? <FontAwesomeIcon icon={faBookmark} onClick={changeFavour}/> : <FontAwesomeIcon icon={fv} onClick={changeFavour}/>} {nbFavour}</span>
            <Link to={`/dash/recipe/${recipe.id}`} className="btn"> VIEW RECIPE </Link>
            <span className="likes"> {like? <FontAwesomeIcon icon={faHeart} onClick={changeLike}/> : <FontAwesomeIcon icon={f} onClick={changeLike}/>} {nbLike}</span>
        </div>
        {
            auth.username === recipe?.chief?.email &&
                <div className="action">
                    <button type="submit" className="edit"><Link to={`/dash/new-recipe/${recipe.id}`}>Edit</Link></button>
                    <button type="submit" onClick={deleteRecipe} className="delete">Delete</button>
                </div>
        }
    </div>
    )
}

// <div className="product-card">
//     <img src={recipe.image} alt="{name}" className="product-image"/>
//     <h3 className="product-name">{recipe.title}</h3>
//     <p className="product-description">{recipe.title}</p>
//     <p className="product-price">{recipe.title}</p>
//     <div className="product-actions">
//         <Link to="/dash/recipe" className="btn">VIEW RECIPE</Link>
//     </div>
// </div>