import CustomImage from "./CustomImage.jsx";
import { Link, useLocation } from "react-router-dom"
export default function HeroSection() {

    const images = [
        "img/gallery/met5.jpeg",
        "img/gallery/img_2.jpg",
        "img/gallery/img_3.jpg",
        "img/gallery/met1.jpeg",
        "img/gallery/met6.jpeg",
        "img/gallery/img_6.jpg",
        "img/gallery/img_7.jpg",
        "img/gallery/img_8.jpg",
        "img/gallery/met2.jpeg"
    ]

    return (
        <div className="section hero">
            <div className="col typography">
                <h1 className="title">What Are We About</h1>
                <p className="info"> <span>C<span className="logo">oo</span>kHub</span> is a place where you can please your soul and tummy with delicious food
                    recepies of all cuisine. And our service is absolutely free. So start exploring now.</p>
                <Link to="/login" className="btn">explore now</Link>
            </div>
            <div className="col gallery">
                {images.map((image, index) => (
                    <CustomImage pt={"90%"} src={image} key={index} />
                ))}
            </div>
        </div>
    )
}