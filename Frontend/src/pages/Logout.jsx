import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../components/Image";
import useAuth from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";


const Logout = () => {
    const { setAuth, setToken } = useAuth();
    const navigate = useNavigate(); 
    const queryClient = useQueryClient();
    
    const handleLogOut = async () => {
        try 
        {
            const res = await fetch("http://localhost:5007/auth/logout", {
                method: "POST",
                credentials:"include"
            });
            if (!res.ok) {
                return console.log("Error while logging out.");
            }
            
            queryClient.removeQueries(['userRole']);

            setAuth(null);
            setToken(null);
            localStorage.removeItem("auth");
            console.log("cleared");
            navigate("/", { replace: true }); 
            window.location.reload();
        } 
        catch (err) 
        {
            console.error("Logout failed:", err);
        }
    };


    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 max-w-[1240px] mx-auto my-10 px-4 md:px-8 space-y-10">
            <div className="w-full lg:w-1/2 flex flex-col gap-5 max-md:py-15 ">
                <h1 className="heroHeader text-3xl lg:text-5xl font-bold">Click Here To Log Out.</h1>
                <div className="flex gap-3">
                    <div onClick={()=>handleLogOut()} className={` CustomB cursor-pointer text-md xl:text-lg font-semibold px-4 xl:px-6 py-2 min-h-12 min-w-26 flex items-center justify-center`}>Logout</div>
                    <div onClick={()=>navigate('/')} className={` CustomB cursor-pointer text-md xl:text-lg font-semibold px-4 xl:px-6 py-2 min-h-12 min-w-26 flex items-center justify-center`}>Go Home</div>
                </div>
            </div>
            <Image lazy={false} path={"Logoutbg.svg"} className="shadow-md rounded-2xl max-h-180 lg:max-w-[40vw] lg:w-1/2 object-cover object-center" />
        </div>
    );
};

export default Logout;
