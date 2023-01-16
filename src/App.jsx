import React, {useEffect, useState} from 'react';
import {NavLink, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Contact from "./pages/Contact.jsx";
import AdminPageDelete from "./pages/AdminPageDelete.jsx";
import Header from "./components/Header.jsx";
import apiFacade from "./utils/apiFacade.js";
import facade from "./utils/apiFacade.js";
import SingleCharityPage from "./pages/SingleCharityPage.jsx";
import EditUser from "./components/EditUser.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Trip from './pages/Trips.jsx';

function App(props) {

    const [loggedIn, setLoggedIn] = useState(false)
    const [role, setRole] = useState("")
    const [errorMessage, setErrorMessage] = useState('All is good ... so far');
    const [Username, setUsername] = useState("");
    const [UserId, setUserId] = useState("");

    useEffect(() => {
        if(apiFacade.getToken()) setLoggedIn(true), setRole(apiFacade.getUserRoles(),setUsername(apiFacade.getUsername),setUserId(apiFacade.getUserId))
    })

    return (
        <>
            <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} setRole={setRole} role={role}/>
            <Routes>
                <Route path="/" element={<Trip loggedIn={loggedIn} Username={Username} UserId={UserId} role={role}/>}/>
                <Route path='singleCharityPage'element={<SingleCharityPage/>}></Route>
                <Route path="admin" element={facade.hasUserAccess('admin', loggedIn) && <AdminPageDelete facade={facade} setErrorMessage={setErrorMessage} UserId={UserId}/>}/>
                <Route path="editUser/:usid" element={<EditUser/>}/>
                <Route path="*" element={<h1>Page Not Found !!!!</h1>}/>
            </Routes>
        </>
    );
}

export default App;
