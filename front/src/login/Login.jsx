import React from "react";
import '../App.css';
import LoginForm from "./LoginForm";
import Logout from "./Logout";

const Login=()=>{
    let loginok=localStorage.loginok;
    return(
        <div>
            {
                loginok==="yes"?<Logout/>:<LoginForm/> //loginok가 null이면 loginform 아니면 logout
            }
        </div>
    )
}
export default Login;