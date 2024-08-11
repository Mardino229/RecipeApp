import HeroSection from "../../components/LandingComponents/HeroSection.jsx";
import ImproveSkills from "../../components/LandingComponents/ImproveSkills.jsx";
import QuoteSection from "../../components/LandingComponents/QuoteSection.jsx";
import ChiefsSection from "../../components/LandingComponents/ChiefsSection.jsx";
import Navbar from "../../components/LandingComponents/NavBar.jsx";
import Footer from "../../components/LandingComponents/Footer.jsx";

export default function Home(){
    return (
        <div>
            <HeroSection />
            <ImproveSkills />
            <QuoteSection />
            {/*<ChiefsSection />*/}
        </div>
    )
}