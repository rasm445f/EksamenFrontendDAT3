import React from 'react';
import {useEffect,useState} from "react";
import apiFacade from "../utils/apiFacade.js";
import Login from "../components/Login.jsx";
import LoggedIn from "../components/LoggedIn.jsx";
import "../styles/home.css";
import "../styles/buttons.css";
import PostForm from "../components/PostForm.jsx";
import Contact from "./Contact.jsx";
import {Route, Routes,useNavigate} from "react-router-dom";
import SingleCharityPage from "./SingleCharityPage.jsx";
import "../resources/plusIcon.png";
import table from "react-bootstrap/Table";




function Home({loggedIn, Username, UserId}) {
    

const [data, setData] = useState([])
const [isShown, setIsShown] = useState(true)
    const navigate = useNavigate();

    const allCharitys = [
        "aapi-led",
        "adoption",
        "afghanistan",
        "animals",
        "athletics",
        "autism",
        "black-led",
        "buddhism",
        "cancer",
        "cats",
        "christianity",
        "climate",
        "conservation",
        "coronavirus",
        "culture",
        "dance",
        "disabilities",
        "disease",
        "dogs",
        "education",
        "environment",
        "filmandtv",
        "food-security",
        "freepress",
        "gender-equality",
        "health",
        "hinduism",
        "housing",
        "humans",
        "hurricane-laura",
        "immigrants",
        "indigenous-led",
        "indigenous-peoples",
        "islam",
        "judaism",
        "justice",
        "latine-led",
        "legal",
        "lgbt",
        "libraries",
        "mental-health",
        "middle-east",
        "museums",
        "music",
        "oceans",
        "poverty",
        "racial-justice",
        "refugees",
        "religion",
        "reproductive-justice",
        "research",
        "science",
        "seniors",
        "space",
        "theater",
        "transgender",
        "ukraine",
        "veterans",
        "visualart",
        "votingrights",
        "water",
        "wildfires",
        "wildlife",
        "women-led",
        "womens-health",
        "youth"];



const handleClick = async (Category) => {

   await fetch("http://localhost:8080/api/charity/"+Category).then(res =>{
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => setData(jsonResponse.nonprofits))

        /*setIsShown(current => !current)*/
}

const handleSpeseficCharity = (charity) =>{
        navigate('/SingleCharityPage', {
            state: { charity: charity },
        })
    }

  


    const handelFavorite = async (charity) => {

        let favoriteInfo ={
            "UserId": UserId,
            "charitySlug": charity.slug
        }
        await fetch("http://localhost:8080/api/charity/favorite/", favoriteInfo)
        console.log("You just favrorited this charity: " + charity.slug + " with the user: " + UserId);
    }


const removeCharity = (charity) => {
    setData(current =>
      current.filter(obj => {
        return obj !== charity;
      }),
    );
  };
const genetateButtons = () => {
    return allCharitys.map((Category) => {
        return <>
            <button className="my-charity" onClick={() => handleClick(Category)}>{Category}</button>
        </>
    })
}

function generateCharityObj(charity){
    
    let description = charity.description
    if (description === undefined){
        description = "No description available"
    }else{
        description = charity.description
    }


    const charityObj = {
        name: charity.name,
        category: charity.category,
        slug: charity.slug,
        description: description,
        profileUrl: charity.profileUrl,
        location : charity.location,
    }
    return charityObj
}

    return (


        <div>


    
            <p>Welcome, {Username} here is the id:{UserId}!</p>
            <h1 className='greeting'>Charities</h1>

            {!loggedIn ? (<div className='greeting'>Please log in or create an account <PostForm/> </div>) :
            (<div>

                {genetateButtons()}
                {isShown && (
                    <div>
                <ul>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Name:</th>
                            <th>Topics:</th>
                            <th></th>
                        </tr>
                        </thead>

                    {data.map(charity =>(

                        <tbody>
                        <tr>
                            <td>{charity.name}</td>
                            <td>{charity.tags +""}</td>

                            <td>
                            <form onClick={() => handleSpeseficCharity(generateCharityObj(charity))}>
                            <input type="image" src="src/resources/plusIcon.png" width="30" height="30"/>
                            </form>
                            </td>

                            <td><FavoriteForm userId={UserId} charity={charity}/></td>

                        </tr>
                        </tbody>

                    ))}

                    </table>
                </ul>                        

                    </div>

                )}
            </div>)}
        </div>
)}      

export default Home;

