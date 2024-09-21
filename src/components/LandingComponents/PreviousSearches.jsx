import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import {useState} from "react";

export default function PreviousSearches({search}){
    const searches = ['pizza', 'burger', 'cookies', 'juice', 'biriyani', 'salad', 'ice cream', 'lasagna', 'pudding', 'soup']
    return (
        <div className="previous-searches section">
            {/*<h2>Previous Searches</h2>*/}
            {/*<div className="previous-searches-container">*/}
            {/*    {searches.map((search, index) => (*/}
            {/*        <div key={index} style={{animationDelay: index * .1 + "s"}} className="search-item">*/}
            {/*            {search}*/}
            {/*        </div>))}*/}
            {/*</div>*/}
            {/*<div className="search-box">*/}
            {/*    /!*<input type="text" placeholder="Search ..."/>*!/*/}
            {/*    /!*<button className="btn">*!/*/}
            {/*    /!*    <FontAwesomeIcon icon={faSearch}/>*!/*/}
            {/*    /!*</button>*!/*/}
            {/*</div>*/}
            {/*<div className="wrap-input-18">*/}
            {/*    <div className="search">*/}
            {/*        <div>*/}
            {/*            <input type="text" placeholder="Search . . ."/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <FontAwesomeIcon icon={faSearch}/>*/}

            {/*</div>*/}
            <div className="wrap-input-17">
                <div className="search-box">
                    <button className="btn-search"><FontAwesomeIcon icon={faSearch}/></button>
                    <input type="text" className="input-search"
                           onChange={(e) => {
                               search(e.target.value)
                               console.log(e.target.value)
                           }}
                           placeholder="Type to Search..."/>
                </div>
            </div>
        </div>
    )
}