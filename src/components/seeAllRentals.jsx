import React from 'react';
import {useEffect,useState} from "react";
import "../styles/home.css";
import "../styles/buttons.css";
import {Route, Routes,useNavigate} from "react-router-dom";
import table from "react-bootstrap/Table";
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


    const handleDelete = (index) => {
        axios.delete(`http://localhost:8080/EksamenDAT3_war_exploded/api/rental/${index}`)
        setData([...data]);
        window.location.reload(false);
    }


    return (
        <div>
            <h4 className='greeting'>all rental agreements:</h4>
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
        </div>
    )}

export default seeAllRentals;

