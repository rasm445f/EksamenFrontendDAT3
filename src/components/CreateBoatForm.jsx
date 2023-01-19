import React, {useState} from "react";
import Axios from "axios";


function CreateBoatForm(){
    const url = "http://localhost:8080/EksamenDAT3_war_exploded/api/boat/add"
    const [data, setData] = useState({
        "brand": "",
        "make": "",
        "image": "",
        "name": "",
        "harborID": {
            "id": ""
        }
    });

    function submit(e){
        e.preventDefault();
        Axios.post(url, data)
            .then(res => {
                console.log(res.data);
            })
    }



    function handleChange(e) {
        const newdata = {...data};
        if (e.target.id === "harborID") {
            newdata.harborID.id = e.target.value;
        } else {
            newdata[e.target.id] = e.target.value;
        }
        setData(newdata);
        console.log(newdata);
    }

    return(
        <div>
            <form onSubmit={(e)=> submit(e)}>
                <input onChange={(e)=>handleChange(e)} id="name" value={data.name} placeholder={"Boat name"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handleChange(e)} id="make" value={data.make} placeholder={"make"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handleChange(e)} id="image" value={data.image} placeholder={"image"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handleChange(e)} id="brand" value={data.brand} placeholder={"brand"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handleChange(e)} id="harborID" value={data.harborID.id} placeholder={"Harbour ID"} type={"number"}></input>
                <br/>
                
                <button>submit</button>
            </form>
        </div>

    )
}
export default CreateBoatForm;