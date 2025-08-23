
import { useRef, useEffect, useState, useContext } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CustomButton2  from "../components/CustomButton2";

import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

import RegisterSelectProfile from "../components/RegisterSelectProfile.jsx";
import { useQueryClient } from "@tanstack/react-query";


const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register({toLogin, Logged})
{
    const queryClient = useQueryClient()

    const {setAuth, setToken} = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    
    const [user, setUser] = useState('');
    const [userFocus, setUserFocus] = useState(false);

    
    const [email, setEmail] = useState('');
    
    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [img, setImg] = useState('user.png')
    const [err,setErr] = useState('');

    const validName = USER_REGEX.test(user) ;
    const validPwd = PWD_REGEX.test(pwd) ;
    const validEmail = EMAIL_REGEX.test(email);

    useEffect(()=>
    {
        userRef.current.focus();
    },[]);

    useEffect(()=>
    {
        setErr('');
    },[user,email,pwd]); 

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!validName || !validPwd) {
            setErr("Invalid username or password format.");
            return;
        }
    
        try {
            const res = await fetch('http://localhost:5007/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: user,
                    email: email,
                    password: pwd,
                    img:img || "user.png"
                }),
                credentials: "include" 
            });
    
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            const roles = data.role;
            const id = data.id;
            console.log("ok")
            setErr("");
            setToken(data.Access_token);
            const userData = {user,roles,id,img};
            setAuth(userData);
            localStorage.setItem("auth",JSON.stringify(userData));
    
            queryClient.invalidateQueries(['userRole']);

            Logged();

        } catch (error) {
            console.log(error)
            setErr(error.message);
        }
    };
    
    useEffect(()=>
    {
        console.log(img)
    },[img])

    return(
        <section className="flex justify-center items-center  bg-white rounded-2xl">
            <div className="flex flex-col shadow-xl w-full max-w-md max-sm:max-w-[95vw] p-6 rounded-xl gap-6">
                {err && ( <p ref={errRef}  aria-live="assertive" className="text-red-500 text-center">
                    {err}
                </p>)}
                <h1 className="font-semibold text-3xl text-center ">Register</h1>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div className="w-full flex itmes justify-center">
                        <RegisterSelectProfile setImg={setImg}/>
                    </div>
                    <label htmlFor="username" className="text-sm font-medium">Username:
                        <span className={user && validName  ? "valid" : "hidden"}>
                            <FontAwesomeIcon icon={faCheck} className="text-green-400 mx-1"/>
                        </span>
                        <span className={validName || !user ? "hidden" :"invalid"}>
                            <FontAwesomeIcon icon={faTimes} className="text-red-400 mx-1"/>
                        </span>
                        <input type="text" className="w-full p-3 rounded-md border-2 border-blue-300/80 focus:outline-none focus:ring-2 focus:ring-primary"
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
                        className={` text-xs text-gray-400`}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        4 to 23 chars. <br/>
                        Must begin with a letter. <br/>
                        Letters, numbers, underscores, hyphens allowed  
                    </p>

                    
                    <label htmlFor="email">Email:
                        
                        <input type="email" className="w-full p-3 rounded-md border-2 border-blue-300/80 focus:outline-none focus:ring-2 focus:ring-primary"
                            id="email" 
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            aria-invalid={validEmail ? "false":"true"}
                            aria-describedby="emailnote" 
                        />
                    </label>
                    
                    <label htmlFor="password" className="text-sm font-medium">Password:
                        <span className={validPwd ? "valid" : "hidden"}>
                            <FontAwesomeIcon icon={faCheck} className="text-green-400 mx-1"/>
                        </span>
                        <span className={validPwd || !pwd ? "hidden" :"invalid"}>
                            <FontAwesomeIcon icon={faTimes} className="text-red-400 mx-1"/>
                        </span>
                        <input type="password" className="w-full p-3 rounded-md border-2 border-blue-300/80 focus:outline-none focus:ring-2 focus:ring-primary"
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
                        className={ `text-xs text-gray-400 `}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        8 to 24 chars. <br/>
                        Must include upper and lower case letters, numbers and special symbols ! @ # $ %<br/>
                    </p>



                    <CustomButton2 disable={!validName||!validPwd||!validEmail} label='Sing Up' />
                    


                </form>

                <div className="w-full flex flex-col items-center">
                    <p className="text-gray-400"> Already have an account? </p>
                    <p onClick={toLogin}  className="text-[#62aaf7] hover:underline"> Login </p>
                </div>
            </div>
        </section>
    );
}
export default Register;