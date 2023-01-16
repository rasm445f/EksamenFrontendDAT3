import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const EditUser = () => {
    const {usid} = useParams();
    const [id, idChange] = useState(0);
    const [userName, nameChange] = useState("");
    const [roleName, roleChange] = useState("");
    const [active, activeChange] = useState(true);

    const [data, setData] = useState({
        "userName": "",
        "userPass": "",
        "roleList": [
            {"roleName": "user"}
        ]
    });

    useEffect(() => {
        fetch("http://localhost:8080/EksamenDAT3_war_exploded/api/user/"+usid).then((res)=>{
            return res.json();
        }).then((res)=>{
            nameChange(res.userName);
            roleChange(res.roleName);
            console.log(res);
        }).catch((err)=>{
            console.log(err.message);
        })

    }, []);

    const handelSubmit= (e) => {
    e.preventDefault();
        console.log(userName,roleName)
    }


    return(
        <div>
            <form onSubmit={(e)=> submit(e)}>
                <input onChange={e=>nameChange(e.target.value)} id="userName" value={userName} placeholder={"username"} type={"text"}></input>
                <br/>
                <input onChange={e=>roleChange(e.target.value)} id="roleName" value={roleName} placeholder={"role"} type={"text"}></input>
                <button>submit</button>
            </form>
        </div>
    );

}
export default EditUser;