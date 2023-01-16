import React from 'react';
import { useLocation } from "react-router-dom";


function SingleCharityPage() {
    const location = useLocation();


    let guide = location.state.guide;
    console.log(guide)

    return (
        <div>

            <table>
            <thead>
                <tr>
                    <th>Guide Id: </th>
                    <th>Guide køn: </th>
                    <th>Guide fødselsår: </th>
                    <th>Information:</th>
                    <th>Billede:</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{guide.id}</td>
                    <td>{guide.gender}</td>
                    <td>{guide.birthYear}</td>
                    <td>{guide.profile}</td>
                    <td>{guide.imageUrl}</td>
                </tr>
            </tbody>

            </table>
            
            <br/>
        

        </div>
    );
}

export default SingleCharityPage;