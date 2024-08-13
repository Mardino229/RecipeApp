import {Link} from "react-router-dom";

export default function Footer(){
    return (
        <div className="footer container">
            <div className="footer-section">
                <Link to="/" className="logo" translate="no"> C<span>oo</span>kHub</Link>
                <p> is a place where you can please your soul and tummy with delicious food recipes of all cuisine. And our service is absolutely free.</p>
                <p>&copy; 2024 | All Rights Reserved</p>
            </div>
            <div className="footer-section">
                <p className="title">Contact Us</p>
                <p>cookhub@gmail.com</p>
                <p>+229 98169295</p>
                <p>Cotonou</p>
            </div>
            <div className="footer-section">
                <p className="title">Socials</p>
                <p>Facebook</p>
                <p translate="no">Twitter</p>
                <p>Instagram</p>
            </div>
        </div>
    )
}