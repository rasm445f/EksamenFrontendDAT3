import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";



function Header({setErrorMsg, loggedIn, setLoggedIn, role}) {


    return (
        <nav className="topnav">
            <NavLink className="active" to="/"><i className="fa fa-fw fa-home"></i> Home</NavLink>

            {role !== "admin" ? (<role setErrorMsg={setErrorMsg} />) :
                (<div>
                    <NavLink to="/admin"><i className="fa fa-fw fa-admin"></i> Admin Page</NavLink>
                </div>)}


            {!loggedIn ? (<Login setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg}  />) :
                (<div>
                    <LoggedIn setLoggedIn={setLoggedIn}/>
                </div>)}
        </nav>
    );
}

export default Header;
