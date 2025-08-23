import { useRef, useEffect, useState } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CustomButton2  from "../components/CustomButton2";
import useAuth from "../hooks/useAuth";

import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const USER_REGEX = /^[A-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



function Login({ func, toRegister, Logged })
{

    const {setAuth, setToken, checkAuth} = useAuth();

    const queryClient = useQueryClient()
    
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    
    const [user, setUser] = useState('');
    const [userFocus, setUserFocus] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [err,setErr] = useState('');

    const validName = USER_REGEX.test(user) ;
    const validPwd = PWD_REGEX.test(pwd) ;

    useEffect(()=>
    {
        userRef.current.focus();
    },[]);

    useEffect(()=>
    {
        setErr('');
    },[user,pwd]); 

    const handleLogin = async (e) => {
        e.preventDefault();
        

        if (!validName || !validPwd) {
            setErr("Invalid username or password format.");
            return;
        }
        try {
            const res = await fetch('http://localhost:5007/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: user,
                    pwd: pwd
                }),
                credentials: "include" 
            });

            const data = await res.json();
            if (!res.ok) {
                setErr(data.message || "An error occurred");
                return;
            }
            const roles = data.role;
            const img = data.profile
            const id = data.id;
            setErr("");
            setToken(data.Access_token);
            const userData = {user,roles,img,id,Access_token:data.Access_token};
            setAuth(userData);
            localStorage.setItem("auth",JSON.stringify(userData));
            checkAuth();
            queryClient.invalidateQueries(['userRole']);
            Logged();
            
        } catch (error) {
            setErr(error.message);
        }
    };
    

    return(
        <section className="flex justify-center items-center bg-white rounded-2xl">
            <div className="flex flex-col shadow-xl w-full max-w-md max-sm:max-w-[95vw]   p-6 rounded-xl gap-6">
                {err && ( <p ref={errRef}  aria-live="assertive" className="text-red-500 text-center">
                    {err}
                </p>)}
                <h1 className="font-semibold text-3xl text-center ">Log In</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <label htmlFor="username" className="text-sm font-medium ">Username:
                        <span className={user && validName  ? "valid" : "hidden"}>
                            <FontAwesomeIcon icon={faCheck} className="text-green-400 mx-1"/>
                        </span>
                        <span className={validName || !user ? "hidden" :"invalid"}>
                            <FontAwesomeIcon icon={faTimes} className="text-red-400 mx-1"/>
                        </span>
                        <input type="text" className={`w-full p-3 rounded-md border border-blue-300/80 focus:outline-none focus:ring-2 focus:ring-[#4786b0]`}
                        id="username" 
                        ref={userRef}
                        autoComplete="off" 
                        onChange={(e)=>setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false":"true"}
                        aria-describedby="uidnote"
                        onFocus={()=>setUserFocus(true)} 
                        onBlur={()=>setUserFocus(false)}
                    />
                    </label>
                    
                    <p id="uidnote"
                        className={` text-xs text-gray-400 `}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        4 to 23 chars. <br/>
                        Must begin with a letter. <br/>
                        Letters, numbers, underscores, hyphens allo
                        wed  
                    </p>

                    
                    <label htmlFor="password" className="text-sm font-medium">Password:
                        <span className={validPwd ? "valid" : "hidden"}>
                            <FontAwesomeIcon icon={faCheck} className="text-green-400 mx-1"/>
                        </span>
                        <span className={validPwd || !pwd ? "hidden" :"invalid"}>
                            <FontAwesomeIcon icon={faTimes} className="text-red-400 mx-1"/>
                        </span>
                        <input type="password" className={`w-full p-3 rounded-md border border-blue-300/80 focus:outline-none focus:ring-2 focus:ring-[#4786b0]`}
                        id="password" 
                        onChange={(e)=>setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false":"true"}
                        aria-describedby="pwdnote"
                        onFocus={()=>setPwdFocus(true)} 
                        onBlur={()=>setPwdFocus(false)}
                    />
                    </label>
                    
                    <p id="pwdnote"
                        className={` text-sm text-gray-400 `}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        8 to 24 chars. <br/>
                        Must include upper and lower case letters, numbers and special symbols ! @ # $ %<br/>
                    </p>

                    <CustomButton2 disable={!validName||!validPwd} label='Log In' />
                    

                </form>
                <div className="w-full flex flex-col items-center">
                    <p className="text-gray-400"> Don't have an account? </p>
                    <p onClick={toRegister}  className="text-[#62aaf7] hover:underline"> Register </p>
                </div>
                
            </div>
        </section>
    );
}
export default Login;