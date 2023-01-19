import React from 'react';
import {useEffect,useState} from "react";
import "../styles/home.css";
import "../styles/buttons.css";
import PostForm from "../components/PostForm.jsx";
import {Route, Routes,useNavigate} from "react-router-dom";
import table from "react-bootstrap/Table";
import SeeAllRentals from "../components/seeAllRentals";






function Rentals({loggedIn, Username, UserId, role}) {


    const [data, setData] = useState([])
    const [isShown, setIsShown] = useState(true)
    const [rentals, setRentals] = useState([])
    const navigate = useNavigate();
    const tenantID= 2;


    useEffect(() => {
        fetch("http://localhost:8080/EksamenDAT3_war_exploded/api/rental/tenant/"+tenantID)
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



            <p>Welcome, {Username} here is the id:{UserId}!</p>
            <h3 className='greeting'>all your rentals:</h3>

            {!loggedIn ? (<div className='greeting'>Please log in or create an account <PostForm/> </div>) :
                (<div>


                        <div>
                            <ul>
                                <table class="table">
                                    <thead>
                                    <tr>
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
                                            <td>{rental.startDate}</td>
                                            <td>{rental.endDate}</td>
                                            <td>{rental.priceAnnual}</td>
                                            <td>{rental.deposit}</td>

                                        </tr>

                                        <td>
                                            <button onClick={() => handleSpecificHouse(generateHouseObj(rental.houseID))}>Info om House</button>
                                        </td>
                                        </tbody>

                                    ))}

                                </table>
                            </ul>
                            <div>
                                <td>{role !=="admin" ? (<div><b> </b></div>):(<div><SeeAllRentals></SeeAllRentals></div>)}</td>

                            </div>

                        </div>


                </div>)}
        </div>
    )}

export default Rentals;

