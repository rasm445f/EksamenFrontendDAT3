import React from 'react';
import {useEffect,useState} from "react";
import apiFacade from "../utils/apiFacade.js";
import Login from "../components/Login.jsx";
import LoggedIn from "../components/LoggedIn.jsx";
import "../styles/home.css";
import "../styles/buttons.css";
import PostForm from "../components/PostForm.jsx";
import {Route, Routes,useNavigate} from "react-router-dom";
import "../resources/plusIcon.png";
import table from "react-bootstrap/Table";





function ShowBoatsInHarbour({loggedIn, Username, UserId}) {


    const [data, setData] = useState([])
    const [isShown, setIsShown] = useState(true)
    const navigate = useNavigate();

    const allHarbors = ["1","2"];



    const handleClick = async (Category) => {

        await fetch("http://localhost:8080/EksamenDAT3_war_exploded/api/harbor/harbour/"+Category).then(res =>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => setData(jsonResponse))

    }



    const removeHarbor = (harbor) => {
        setData(current =>
            current.filter(obj => {
                return obj !== harbor;
            }),
        );
    };

    const genetateButtons = () => {
        return allHarbors.map((Category) => {
            return <>
                <button className="my-harbor" onClick={() => handleClick(Category)}>{Category}</button>
            </>
        })
    }

    function generateHarborObj(harbor){
        let description = harbor.description

        if (description === undefined){
            description = "No description available"
        }else{
            description = harbor.description
        }


        const harborObj = {
            name: harbor.name,
            category: harbor.category,
            slug: harbor.slug,
            description: description,
            profileUrl: harbor.profileUrl,
            location : harbor.location,
        }


        return harborObj
    }

    return (
        <div>
            <h3 className='greeting'>chose a harbour to see boats:</h3>

                    {genetateButtons()}
                    {isShown && (
                        <div>
                            <ul>
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>Name:</th>
                                        <th>Make:</th>
                                        <th>Image:</th>
                                        <th>Brand:</th>
                                    </tr>
                                    </thead>

                                    {data.map(harbor =>(

                                        <tbody>
                                        <tr>
                                            <td>{harbor.name}</td>
                                            <td>{harbor.make}</td>
                                            <td>{harbor.image}</td>
                                            <td>{harbor.brand}</td>

                                        </tr>
                                        </tbody>

                                    ))}

                                </table>
                            </ul>

                        </div>

                    )}

        </div>
    )}

export default ShowBoatsInHarbour;

