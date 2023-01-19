import React, {useState} from "react";
import Axios from "axios";


function CreateRentalForm(){
    const url = "http://localhost:8080/EksamenDAT3_war_exploded/api/rental/add"
    const [data, setData] = useState({

        "startDate": "",
        "endDate": "",
        "priceAnnual": "",
        "deposit": "",
        "JTHouseID": {
        "id": "",
            "address": "",
            "city": "",
            "numberOfRooms": ""
    }


    
    });

    function submit(e){
        e.preventDefault();
        Axios.post(url, {
            startDate: data.startDate,
            endDate: data.endDate,
            priceAnnual: data.priceAnnual,
            deposit: data.deposit,
            JTHouseID: data.JTHouseID.id,
            address: data.JTHouseID.address,
            city: data.JTHouseID.city,
            numberOfRooms: data.JTHouseID.numberOfRooms

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
                <input onChange={(e)=>handel(e)} id="startDate" value={data.startDate} placeholder={"startDate"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="endDate" value={data.endDate} placeholder={"endDate"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="priceAnnual" value={data.priceAnnual} placeholder={"priceAnnual"} type={"number"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="deposit" value={data.deposit} placeholder={"deposit"} type={"number"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="JTHouseID.id" value={data.JTHouseID.id} placeholder={"House ID"} type={"number"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="JTHouseID.address" value={data.JTHouseID.address} placeholder={"Aaddress"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="JTHouseID.city" value={data.JTHouseID.city} placeholder={"City"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="JTHouseID.numberOfRooms" value={data.JTHouseID.numberOfRooms} placeholder={"Number Of Rooms"} type={"number"}></input>
                <br/>
                
                <button>submit</button>
            </form>
        </div>

    )
}
export default CreateRentalForm;