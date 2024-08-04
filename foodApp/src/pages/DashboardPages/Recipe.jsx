import RecipeCard from "../../components/DashboardComponents/RecipeCard.jsx";

export default function Recipe() {
    return (
        <div className="recipe-container section">
            <h1 className="title">Tarte aux pommes maison</h1>
            <p>Une recette classique et délicieuse</p>

            <div className="recipe-content">
                <div className="recipe-image">
                    <img src="/img/gallery/img_6.jpg" alt="Tarte aux pommes"/>
                </div>
                <div className="recipe-ingredients">
                    <h2>Ingrédients</h2>
                    <ul>
                        <li>6 pommes golden</li>
                        <li>100g de sucre</li>
                        <li>100g de beurre</li>
                        <li>1 pâte brisée</li>
                        <li>1 oeuf</li>
                        <li>1 cuillère à soupe de cannelle</li>
                    </ul>
                </div>
            </div>

            <div className="recipe-preparation">
                <h2>Étapes-Préparation</h2>
                <div className="step">
                    <h3><span className="step-number">1</span></h3>
                    <div>
                        <h3>Préparer la pâte</h3>
                        <p>Étalez la pâte brisée dans un moule à tarte beurré. Piquez le fond avec une fourchette.</p>
                    </div>
                </div>
                <div className="step">
                    <h3><span className="step-number">2</span></h3>
                    <div>
                        <h3>Préparer les pommes</h3>
                        <p>Épluchez et coupez les pommes en tranches fines. Disposez-les sur la pâte en les chevauchant
                            légèrement.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}