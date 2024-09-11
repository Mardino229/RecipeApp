import React from 'react';
import jsPDF from "jspdf";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons";


const RecipePdf = ({ recipe }) => {

    const generatePdf = () => {
        const doc = new jsPDF()

        // Titre de la recette
        doc.setFontSize(20);
        doc.text(recipe.title, 10, 10);

        doc.addImage(`http://localhost:9084/${recipe.imageUrl}`, 'JPEG', 10, 40, 50, 50)

        // Description de la recette
        doc.setFontSize(12);
        doc.text("Description:", 10, 20);
        doc.text(recipe.description, 10, 30);

        // Ingrédients
        doc.text("Ingrédients:", 10, 40);
        recipe.ingredients.forEach((ingredient, index) => {
            doc.text(`- ${ingredient.name}`, 10, 50 + index * 10);
        });

        // Étapes de préparation
        doc.text("Étapes de préparation:", 10, 60 + recipe.ingredients.length * 10);
        recipe.steps.forEach((step, index) => {
            doc.text(`${index + 1}. ${step.name} : `, 10, 70 + recipe.ingredients.length * 10 + index * 10);
            doc.text(`${step.description}`, 10, 70 + recipe.ingredients.length * 10 + index * 10);
        });

        // Enregistrer le PDF sous le nom de la recette
        doc.save(`${recipe.title}.pdf`);
    };

    return (
            <FontAwesomeIcon icon={faPrint} bounce onClick={generatePdf} />
    );
};

export default RecipePdf;
