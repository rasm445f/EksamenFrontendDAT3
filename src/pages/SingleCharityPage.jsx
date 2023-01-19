import React from 'react';
import { useLocation } from "react-router-dom";


function SingleCharityPage() {
    const location = useLocation();


    let house = location.state.house;
    console.log(house)

    return (
        <div>

            <table>
            <thead>
                <tr>
                    <th>House Id: </th>
                    <th>Address: </th>
                    <th>City: </th>
                    <th>Number of rooms:</th>

                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{house.id}</td>
                    <td>{house.address}</td>
                    <td>{house.city}</td>
                    <td>{house.numberOfRooms}</td>
                </tr>
            </tbody>

            </table>
            
            <br/>
        

        </div>
    );
}

export default SingleCharityPage;