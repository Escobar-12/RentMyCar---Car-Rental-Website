import Image from "./Image";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import CustomButton from "./CustomButton";
import { useRole } from "../hooks/useRole";
// import useApplication from "../hooks/applicationHook";

const UserProfile = ({menuOpen}) => {
    const { auth } = useAuth();
    const [openDialog, setOpenDialog] = useState(false);
    const imageRef = useRef(null);
    const modelRef = useRef();

    const { data: role, refetch  } = useRole();
        


    const toggleDialog = async () => {
        setOpenDialog((prev) => !prev);
        if (!openDialog) 
        {
            await refetch();
        }
    };

    const isMobile = () =>
    {
        if( typeof window === "undefined") return false;
        return window.innerWidth <= 1024;
    }
    
    const [showDialog, setShowDialog] = useState(() => !isMobile());
    
    const checkInBoxClicks = (e) =>
    {
        e.preventDefault();
        if( openDialog &&
            imageRef.current && !imageRef.current.contains(e.target) && 
            modelRef.current && !modelRef.current.contains(e.target)
        )
        {
            setOpenDialog(false);
        }
    }

    useEffect(() => {
        if (openDialog) {
            setOpenDialog(true);
            document.addEventListener("click", checkInBoxClicks);
            document.addEventListener("touchstart", checkInBoxClicks);
        } else {
            setOpenDialog(false);
            document.removeEventListener("click", checkInBoxClicks);
            document.removeEventListener("touchstart", checkInBoxClicks);
        }

        return () => {
            document.removeEventListener("click", checkInBoxClicks);
            document.removeEventListener("touchstart", checkInBoxClicks);
        }
    }, [openDialog]);

    // useEffect(() => 
    // {
    //     const handleResize = () =>
    //     {
    //         setShowDialog(isMobile());
    //     }
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // },[])


    // useEffect(() => 
    // {
    //     const verifyAdmin = async () => 
    //     {
    //         const isAdmin = await checkAdmin();
    //         setCheck(isAdmin);
    //     };
    //     verifyAdmin();
    // }, [auth?.user]);
    
    return (
        <div className="relative inline-block">
            <div className="rounded-full cursor-pointer" onClick={toggleDialog} ref={imageRef}>
                <Image 
                    path={auth?.img || "user.png"} alt="profile"
                    className="w-10 h-10 rounded-full object-cover shadow-sm" 
                />
            </div>
            {openDialog && !menuOpen && (
                <div ref={modelRef} className="absolute max-lg:block transform -translate-x-3/4 mt-5 w-50 border-2 border-blue-200 shadow-lg rounded-lg bg-white ">
                    <div className="flex flex-col items-center space-y-5 p-4 rounded-lg">
                        <h1 className="text-sm font-bold"> 
                            Hello, {auth?.user || "Guest"}!
                        </h1>

                        <CustomButton to={`${role===3000 ? "/editor":role===4000 ? "/admin" : "/"  }`} Lable="Dashboard" onClick={() => setOpenDialog(false)} />

                        <CustomButton to="/logout" Lable="Log out" onClick={() => setOpenDialog(false)} />

                        <button 
                            className="mt-2 w-full bg-gray-200 hover:brightness-90 px-3 py-1 rounded-md transition" 
                            onClick={toggleDialog}>
                            Close
                        </button>
                    </div>
                </div>)
            }
        </div>
    );
};

export default UserProfile;
