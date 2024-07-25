import { Link, useLocation } from "react-router-dom"

import { useState } from "react"
import Sidebar from "./SideBar.jsx"

import { faHome, faList, faCog, faUser, faRightToBracket } from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Navbar(){
    const [showSidebar, setShowSidebar] = useState(false)
    const location = useLocation()
    const links = [
        {
            name: "Home",
            path: "/",
            icon: faHome
        },
        {
            name: "Recipes",
            path: "/recipes",
            icon: faList
        },
        // {
        //     name: "Settings",
        //     path: "/settings",
        //     icon: faCog
        // },
        {
            name: "Login",
            path: "/login",
            icon: faRightToBracket
        }

    ]

    function closeSidebar(){
        setShowSidebar(false)
    }
    return (
        <>
            <div className="navbar container">
                <Link to="/" className="logo" translate="no"> EasyC<span>oo</span>kHub</Link>
                <div className="nav-links">
                    { links.map(link => (
                        <Link className={location.pathname === link.path ? "active" : ""} to={link.path} key={link.name}>
                            {link.name === "Login"? <FontAwesomeIcon icon={link.icon} />:""}
                            {link.name}
                        </Link>
                    )) }
                </div>
                <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            { showSidebar && <Sidebar close={closeSidebar} links={links} /> }
        </>
    )
}