import { useState, useEffect } from "react";
import LoggedIn from "../components/LoggedIn";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import axios from "axios";








function Trip ({Username, UserId, loggedIn, role}) {


const [data, setData] = useState([])
const navigate = useNavigate();



useEffect(() => {
     fetch("http://localhost:8080/EksamenDAT3_war_exploded/api/owner/all")
        .then(res =>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => setData(jsonResponse))
}, [])

const handleSpecificGuide = (guide) =>{
    navigate('/SingleCharityPage', {
        state: { guide: guide },
    })
}
function generateGuideObj(guide){
    
    const guideObj = {
        id: guide.id,
        gender: guide.gender,
        birthYear: guide.birthYear,
        profile: guide.profile,
        imageUrl: guide.imageUrl
    }
    return guideObj
}

const handleDelete = (index) => {
    axios.delete(`http://localhost:8080/api/trip/${index}`)
        setData([...data]);
    window.location.reload(false);
    }


return(

   
    <div>

        {!loggedIn ? (<div className='greeting'>Please log in or create an account <PostForm/> </div>) :
        (<div>
        Hello, {Username}

        <table>
        <thead>
            <tr>
                <th>Rejsen</th>
                <th>Dato:</th>
                <th>Tidspunkt:</th>
                <th>Destiantion:</th>
                <th>Varighed:</th>
                <th>Pakkeliste:</th>
                <th></th>
                <th>Guiden:</th>
                {role !== "admin" ? (<b> </b>) :(<div>
                <th>
                    Fjern rejse
                </th>
                </div>)}
                

            </tr>
        </thead>
    {data.map(item => ( 
            
        <tbody>
            <tr>
                <br />
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.location}</td>
                <td>{item.duration}</td>
                <td>{item.packingList}</td>

                <br />
                <td>
                    <button onClick={() => handleSpecificGuide(generateGuideObj(item.fkidGuide))}>Info om guide</button>
                </td>
                <td>{role !=="admin" ? (<div><b> </b></div>):(<div><button onClick={() =>handleDelete(item.id)}>Slet</button></div>)}</td>
                
            </tr>
        
        </tbody>


    ))}

</table>

</div>)}
    </div>


)






}
export default Trip