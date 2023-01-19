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





function SeeMyRentals({loggedIn, Username, UserId}) {


    const [data, setData] = useState([])
    const [isShown, setIsShown] = useState(true)
    const navigate = useNavigate();

    const allBoats = ["click here to see all your rentals"];



    const handleClick = async (Category) => {

        await fetch("http://localhost:8080/EksamenDAT3_war_exploded/api/rental/tenant/"+UserId).then(res =>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => setData(jsonResponse))

    }



    const removeOwner = (owner) => {
        setData(current =>
            current.filter(obj => {
                return obj !== owner;
            }),
        );
    };

    const genetateButtons = () => {
        return allBoats.map((Category) => {
            return <>
                <button className="my-owner" onClick={() => handleClick(Category)}>{Category}</button>
            </>
        })
    }

    function generateOwnerObj(owner){
        let description = owner.description

        if (description === undefined){
            description = "No description available"
        }else{
            description = owner.description
        }


        const ownerObj = {
            name: owner.name,
            category: owner.category,
            slug: owner.slug,
            description: description,
            profileUrl: owner.profileUrl,
            location : owner.location,
        }


        return ownerObj
    }

    return (
        <div>
            <h3 className='greeting'>chose a boat to see owners:</h3>

            {genetateButtons()}
            {isShown && (
                <div>
                    <ul>
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Name:</th>
                                <th>Address:</th>
                                <th>Phone number:</th>
                            </tr>
                            </thead>

                            {data.map(rental =>(

                                <tbody>
                                <tr>
                                    <td>{rental.startDate}</td>
                                    <td>{rental.endDate}</td>
                                    <td>{owner.ownerPhonenum}</td>

                                </tr>
                                </tbody>

                            ))}

                        </table>
                    </ul>

                </div>

            )}

        </div>
    )}

export default SeeMyRentals;

