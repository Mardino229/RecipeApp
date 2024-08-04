import React, {useState, useContext} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {faHome, faList, faGears, faPlus, faPowerOff, faBookmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Sidebar from "../LandingComponents/SideBar.jsx";
import AuthContext from "../../context/AuthProvider.jsx";

function Header() {
    const [showSidebar, setShowSidebar] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const {setAuth} = useContext(AuthContext);
    const links = [
        {
            name: "Home",
            path: "/dash",
            icon: faHome
        },
        {
            name: "Favorites",
            path: "/dash/favorites",
            icon: faBookmark
        },
        {
            name: "My Recipes",
            path: "/dash/my-recipes",
            icon: faList
        },
        // {
        //     name: "New Recipe",
        //     path: "/dash/new-recipe",
        //     icon: faPlus
        // },
        {
            name: "Settings",
            path: "/dash/settings",
            icon: faGears
        },
    ]

    const logout = async () => {
        setAuth({});
        navigate('/login')
    }

    function openOrCloseSidebar(){
        setShowSidebar(!showSidebar)
    }
    return (
        <>
            <div className="navbar container2">
                <Link to="/" className="logo" translate="no"> C<span>oo</span>kHub</Link>
                <div className="nav-links">
                    {links.map(link => (
                        <Link className={location.pathname === link.path ? "active" : ""} to={link.path}
                              key={link.name}>
                            {(link.name === "New Recipe") ? <FontAwesomeIcon icon={link.icon}/> : ""}
                            {(link.name === "") ? <FontAwesomeIcon icon={link.icon}/> : ""}
                            {!(link.name === "Settings") ? link.name : ""}
                        </Link>
                    ))}
                    <button onClick={logout}><FontAwesomeIcon icon={faPowerOff}/></button>
                    <Link className={location.pathname === "Settings" ? "active" : ""} to="/Settings">
                        <FontAwesomeIcon icon={faGears}/>
                    </Link>
                </div>
                <div className="nav-links2">
                    {links.map(link => (
                        <Link className={location.pathname === link.path ? "active" : ""} to={link.path}
                              key={link.name}>
                            <FontAwesomeIcon icon={link.icon}/>
                        </Link>
                    ))}
                    <button onClick={logout}><FontAwesomeIcon icon={faPowerOff}/></button>
                </div>
                {/*<div onClick={openOrCloseSidebar} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>*/}
                {/*    <div className="bar"></div>*/}
                {/*    <div className="bar"></div>*/}
                {/*    <div className="bar"></div>*/}
                {/*</div>*/}
            </div>
            {/*{showSidebar && <Sidebar close={openOrCloseSidebar} links={links}/>}*/}
        </>
    )
}

export default Header;
