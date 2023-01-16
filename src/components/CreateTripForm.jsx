import React, {useState} from "react";
import Axios from "axios";


function CreateTripForm(){
    const url = "http://localhost:8080/api/trip/add"
    const [data, setData] = useState({
        "date": "",
        "time": "",
        "location": "",
        "duration": "",
        "packingList": "",
        "fkidGuide": [
            {"id": ""}
        ]
    });

    function submit(e){
        e.preventDefault();
        Axios.post(url, {
            date: data.date,
            time: data.time,
            location: data.location,
            duration: data.duration,
            packingList: data.packingList,
            fkidGuide: data.fkidGuide.id
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
                <input onChange={(e)=>handel(e)} id="date" value={data.date} placeholder={"date"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="time" value={data.time} placeholder={"time"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="location" value={data.location} placeholder={"location"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="duration" value={data.duration} placeholder={"duration"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="packingList" value={data.packingList} placeholder={"packingList"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="fkidGuide" value={data.fkidGuide.id} placeholder={"Guide ID"} type={"text"}></input>
                <br/>
                
                <button>submit</button>
            </form>
        </div>

    )
}
export default CreateTripForm;