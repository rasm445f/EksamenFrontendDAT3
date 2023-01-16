import React, {useState} from "react";
import Axios from "axios";


function CreateGuideForm(){
    const url = "http://localhost:8080/api/guide/add"
    const [data, setData] = useState({
        "gender": "",
        "birthYear": "",
        "profile": "",
        "imageUrl": "",
    
    });

    function submit(e){
        e.preventDefault();
        Axios.post(url, {
            gender: data.gender,
            birthYear: data.birthYear,
            profile: data.profile,
            imageUrl: data.imageUrl,
        })
            .then(res => {
                console.log(res.data)
            })
    }

    function handel(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    return(
        <div>
            <form onSubmit={(e)=> submit(e)}>
                <input onChange={(e)=>handel(e)} id="gender" value={data.gender} placeholder={"gender"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="birthYear" value={data.birthYear} placeholder={"Birth Year"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="profile" value={data.profile} placeholder={"Info"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="imageUrl" value={data.imageUrl} placeholder={"imageUrl"} type={"text"}></input>
                <br/>
                
                <button>submit</button>
            </form>
        </div>

    )
}
export default CreateGuideForm;