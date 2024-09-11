import { useNavigate, useParams } from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import html2pdf from 'html2pdf.js';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faDownload, faPrint, faShare} from "@fortawesome/free-solid-svg-icons";

export default function RecipeView() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const pdfRef = useRef();
    const [copied, setCopied] = useState(false);

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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Réinitialiser après 2 secondes
            })
            .catch((err) => {
                console.error("Erreur lors de la copie : ", err);
            });
    }

    const generatePdf = () => {
        const element = pdfRef.current;
        const options = {
            margin: 10, // Marges en millimètres (tu peux ajuster cette valeur)
            filename: `${recipe.title}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2,
                logging: true, // pour voir les logs en console
                allowTaint: true,
                useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf()
            .from(element).set(options)
            .save();
    };

    return (
        <div className="recipe-container section">
            <div  ref={pdfRef}>
                <div className="preview">
                    <h1 className="title">{recipe?.title}</h1>
                    <p>{recipe?.description}</p>
                </div>

                <div className="recipe-content">
                    <div className="recipe-image">
                        {recipe?.imageUrl ? (
                            <img src={`http://localhost:9084/${recipe.imageUrl}`}
                                 alt={recipe?.title || "Recipe Image"}/>
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
            <div className="act">
                <button className="btn" onClick={() => copyToClipboard(window.location.href)}>
                    Share recipe
                    {copied ?
                        <>
                            <div className="toast">
                                Lien copié dans le presse-papier !
                            </div>
                            <FontAwesomeIcon icon={faCheck}/>

                        </>
                        :
                        <FontAwesomeIcon icon={faShare} beat/>
                    }
                </button>
                <button className="btn" onClick={generatePdf}>
                    Download recipe
                    <FontAwesomeIcon icon={faDownload} beat/>
                </button>
            </div>
        </div>
    );
}
