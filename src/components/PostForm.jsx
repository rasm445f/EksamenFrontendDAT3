import React, {useState} from "react";
import Axios from "axios";


function PostForm(){
    const url = "http://localhost:8080/EksamenDAT3_war_exploded/api/user/add"
    const [data, setData] = useState({
        "userName": "",
        "userPass": "",
        "roleList": [
            {"roleName": "user"}
        ]
    });

    function submit(e){
        e.preventDefault();
        Axios.post(url, {
            userName: data.userName,
            userPass: data.userPass,
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
                <input onChange={(e)=>handel(e)} id="userName" value={data.userName} placeholder={"username"} type={"text"}></input>
                <br/>
                <input onChange={(e)=>handel(e)} id="userPass" value={data.userPass} placeholder={"password"} type={"text"}></input>
                <br/>
                <button>submit</button>
            </form>
        </div>

    )
}
export default PostForm;