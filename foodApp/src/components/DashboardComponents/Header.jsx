import React, {useState, useContext} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {faHome, faList, faGears, faPlus, faPowerOff, faBookmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Sidebar from "../LandingComponents/SideBar.jsx";
import useLogout from "../../hooks/useLogout.jsx";

function Header() {
    const [showSidebar, setShowSidebar] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const logout = useLogout()
    const links = [
        {
            name: "Home",
            path: "/dash",
            icon: faHome
        },
        {
            name: "Favorites",
            path: "/dash/my-favourites-recipes",
            icon: faBookmark
        },
        {
            name: "My Recipes",
            path: "/dash/my-recipes",
            icon: faList
        },
        // {
        //     name: "New RecipeView",
        //     path: "/dash/new-recipe",
        //     icon: faPlus
        // },
        {
            name: "Settings",
            path: "/dash/settings",
            icon: faGears
        },
    ]

    const signOut = async () => {
        await logout();
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
                            {(link.name === "New RecipeView") ? <FontAwesomeIcon icon={link.icon}/> : ""}
                            {(link.name === "") ? <FontAwesomeIcon icon={link.icon}/> : ""}
                            {!(link.name === "Settings") ? link.name : ""}
                        </Link>
                    ))}
                    <button onClick={signOut}><FontAwesomeIcon icon={faPowerOff}/></button>
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
                    <button onClick={signOut}><FontAwesomeIcon icon={faPowerOff}/></button>
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
