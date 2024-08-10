// import React, {useState} from "react";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faBookmark, faHeart} from "@fortawesome/free-regular-svg-icons";
// import {faBookmark as fv, faHeart as f} from "@fortawesome/free-solid-svg-icons";
// import {Link} from "react-router-dom";
//
//
// function RecipeCardChief() {
//     const [like, setLike] = useState(true)
//     const [nblike, setNbLike] = useState(15)
//
//     const [favour, setFavour] = useState(true)
//     const [nbFavour, setNbFavour] = useState(15)
//     const changeLike = () =>{
//         setLike(!like)
//         if (like){
//             setNbLike(nblike+1)
//         }else {
//             setNbLike(nblike-1)
//         }
//     }
//     const changeFavour = () =>{
//         setFavour(!favour)
//         if (favour){
//             setNbFavour(nbFavour+1)
//         }else {
//             setNbFavour(nbFavour-1)
//         }
//     }
//     return (
//         <div className="recipe-card">
//             <h2 className="recipe-title">{recipe.title}</h2>
//             <p className="recipe-description">{recipe.description}</p>
//             <div className="recipe-image-container">
//                 <img src={`http://localhost:9084/${recipe.imageUrl}`} alt={recipe.title} className="recipe-image"/>
//             </div>
//             {recipe?.chief?.pseudo && <div className="recipe-author">
//                 <img src="../../../public/img/top-chiefs/author.png"  className="author-image"/>
//                 <span className="title">Written by {recipe.chief.pseudo}</span>
//             </div>}
//             <div className="recipe-stats">
//                 <span className="comments">{favour? <FontAwesomeIcon icon={faBookmark} onClick={changeFavour}/> : <FontAwesomeIcon icon={fv} onClick={changeFavour}/>} {nbFavour}</span>
//                 <Link to={`/dash/recipe/${recipe.id}`} className="btn"> VIEW RECIPE </Link>
//                 <span className="likes"> {like? <FontAwesomeIcon icon={faHeart} onClick={changeLike}/> : <FontAwesomeIcon icon={f} onClick={changeLike}/>} {nblike}</span>
//             </div>
//         </div>
// }