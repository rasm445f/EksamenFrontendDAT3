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
import ShowBoatsInHarbour from "../components/ShowBoatsInHarbour.jsx";
import ApiFacade from "../utils/apiFacade.js";
import axios from "axios";






function seeAllRentals({loggedIn, Username, UserId}) {


    const [data, setData] = useState([])
    const [isShown, setIsShown] = useState(true)
    const [rentals, setRentals] = useState([])
    const navigate = useNavigate();


    useEffect(() => {
        fetch("http://localhost:8080/EksamenDAT3_war_exploded/api/rental/all")
            .then(res =>{
                if(res.ok){
                    return res.json()
                }
            }).then(jsonResponse => setRentals(jsonResponse))
    }, [])



    const handleSpecificHouse = (house) =>{
        navigate('/SingleCharityPage', {
            state: { house: house },
        })
    }







    const removeCharity = (charity) => {
        setData(current =>
            current.filter(obj => {
                return obj !== charity;
            }),
        );
    };

    const handleDelete = (index) => {
        axios.delete(`http://localhost:8080/EksamenDAT3_war_exploded/api/rental/${index}`)
        setData([...data]);
        window.location.reload(false);
    }

    function generateHouseObj(house){

        const houseObj = {
            id: house.id,
            address: house.address,
            city: house.city,
            numberOfRooms: house.numberOfRooms,
        }
        return houseObj
    }

    return (


        <div>




            <h4 className='greeting'>all rental agreements:</h4>

                (<div>


                    <div>
                        <ul>
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>rental ID:</th>
                                    <th>start date:</th>
                                    <th>end date:</th>
                                    <th>price Annual:</th>
                                    <th>deposit:</th>
                                    <th>House ID:</th>
                                    <th></th>
                                </tr>
                                </thead>

                                {rentals.map(rental =>(

                                    <tbody>
                                    <tr>
                                        <td>{rental.id}</td>
                                        <td>{rental.startDate}</td>
                                        <td>{rental.endDate}</td>
                                        <td>{rental.priceAnnual}</td>
                                        <td>{rental.deposit}</td>



                                    </tr>

                                    <td>
                                        <td><div><button onClick={() =>handleDelete(rental.id)}>Delete agreement</button></div></td>
                                    </td>
                                    </tbody>

                                ))}

                            </table>
                        </ul>
                        <div>

                        </div>

                    </div>


                </div>)}
        </div>
    )}

export default seeAllRentals;

