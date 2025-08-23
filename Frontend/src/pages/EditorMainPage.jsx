import React, { useEffect, useReducer, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useApplication from '../hooks/applicationHook';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Categories = [{ name: 'Sedan' },
                    { name: 'Hatchback' }, 
                    { name: 'SUV' }, 
                    { name: 'Crossover' }, 
                    { name: 'Coupe' }, 
                    { name: 'Minivan / MPV' }, 
                    { name: 'Electric Vehicles' }, 
                    { name: 'Luxury Cars' }, 
                    { name: 'Sports Cars' }, 
                    { name: 'Pickup Truck' }];
                    
const FuelTypes = [{ name: 'Gasoline' },
                    { name: 'Diesel' }, 
                    { name: 'Electric' }, 
                    { name: 'Hybrid' },];

const Transmission = [{ name: 'Manual' },
                    { name: 'Automatic' }, 
                    { name: 'Dual-Clutch' }, 
                    { name: 'Semi-Automatic' }, 
                    { name: 'CVT' },];


const initialState = 
{
    images: [],
    category: "",
    description: "",
    price: 0,
    carbrand: "",
    carmodel: "",
    caryear: "",
    seatingcapacity: 0,
    fueltype: "",
    transmission: "",
    location: ""
}

function reducer(state, action)
{
    switch (action.type)
    {
        case "SET_FIELD" :
            return {...state, [action.field]: action.value};
        case "SET_IMAGES":
            const uploaded = [...state.images];
            uploaded[action.index] = action.value;
            return {...state, images: uploaded };
        case "RESET":
            return {...initialState}
        default:
            return state;
    }
}


const EditorMainPage = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const { imageKitConfig, authenticator,fetchWithToken } = useApplication();
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();
    
    const [state, dispatch] = useReducer(reducer, initialState);

    const changeField = (field) => (e) =>
    {
        dispatch({type:"SET_FIELD", field:field, value:e.target.value});
    }
    const checkFields = () => 
    {
        return Object.entries(state).every(([key, value]) => 
            {
                if (Array.isArray(value)) return value.length > 0;
                if (typeof value === 'number') return value > 0;
                return value !== "" && value != null;
            });
    };


    const [showImages, setShowImages] = useState([]);
    const [loading, setLoading] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting", state);

        if(!checkFields()) 
        {
            console.log("Please fill all required fieldsajmgekv ");
            return;
        }


        try {
            const res = await fetchWithToken("http://localhost:5007/car/createCar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    brand: state.carbrand,
                    category: state.category,
                    pricePerDay: state.price,
                    images: state.images,
                    description: state.description,
                    model: state.carmodel,
                    year: state.caryear,
                    seating_capacity: state.seatingcapacity,
                    fuel_type: state.fueltype,
                    transmission: state.transmission,
                    location: state.location,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                // BurnToast("error", data.message || "Error while submitting");
                return;
            }
            clearCarInputData();
            // BurnToast("success", "New Product Posted");
        } catch (err) {
            clearCarInputData();
            console.log(err);
            // BurnToast("error", "Error While Submitting");
        }
    };

    const clearCarInputData = () =>
    {
        console.log("Reset");
        dispatch({type:"RESET"});
        setShowImages([])
    }

    useEffect(() => {
        return () => {
            showImages.forEach((img) => {
                if (img && img.startsWith("blob:")) {
                    URL.revokeObjectURL(img);
                }
            });
        };
    }, [showImages]);

    useEffect(() => 
    {
        if(!auth?.user) return navigate("/login",{replace:true});
        // const verifyAdmin = async () => 
        // {
        //     const isAdmin = await checkAdmin();
        //     if(!isAdmin) return navigate("/login",{replace:true});
        // };
        // verifyAdmin();
    }, [auth?.user]);

    return (
        <div className="flex flex-col justify-between bg-white text-gray-500/80">
            <form className="md:p-10 p-4 space-y-5 max-w-3xl" onSubmit={handleSubmit}>
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                    {Array(4).fill('').map((_, index) => (
                        <div key={index} className={`relative border ${loading[index] ? "isLoading" : ""} w-24 h-16 object-cover overflow-hidden border-gray-400 border-dashed cursor-pointer`}>
                            <img
                                className={`w-full h-full object-cover ${loading[index] ? "isLoading" : ""}`}
                                src={showImages[index] || "/src/assets/default_car.jpg"}
                                alt="upload area"
                            />
                            
                            <div className="absolute inset-0 flex justify-center items-center opacity-0 cursor-pointer">
                                <IKContext
                                    urlEndpoint={imageKitConfig.urlEndpoint}
                                    publicKey={imageKitConfig.publicKey}
                                    authenticator={authenticator}
                                >
                                    <IKUpload
                                        useUniqueFileName={true}
                                        onUploadStart={() => {
                                            setLoading((prev) => {
                                                const updated = [...prev];
                                                updated[index] = true;
                                                return updated;
                                            });
                                            
                                        }}
                                        onSuccess={(res) => {
                                            if (!res?.url) return;
                                            dispatch({ type: "SET_IMAGES", field: "images", index:index, value: res.name })
                                            setShowImages((prev) => 
                                                {
                                                const updated = [...prev];
                                                updated[index] = res.url;
                                                return updated;
                                            });
                                            setLoading((prev) => {
                                                const updated = [...prev];
                                                updated[index] = false;
                                                return updated;
                                            });
                                        }}
                                        className="w-full h-full cursor-pointer"
                                        onError={(err) => console.error("Upload error:", err)}
                                    />
                                </IKContext>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className="flex flex-col gap-1 max-w-md">
                        <label className="text-base font-medium" htmlFor="carbrand">Car Brand</label>
                        <input id="carbrand" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" placeholder="Type here" onChange={changeField("carbrand")} value={state.carbrand} />
                    </div>
                    <div className="flex flex-col gap-1 max-w-md">
                        <label className="text-base font-medium" htmlFor="carmodel">Car Model</label>
                        <input id="carmodel" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" placeholder="Type here" onChange={changeField("carmodel")} value={state.carmodel}/>
                    </div>
                    <div className="flex flex-col gap-1 max-w-md">
                        <label className="text-base font-medium" htmlFor="caryear">Car Year</label>
                        <input id="caryear" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" placeholder="Type here" onChange={changeField("caryear")} value={state.caryear}/>
                    </div>
                    <div className="flex flex-col gap-1 max-w-md">
                        <label className="text-base font-medium" htmlFor="seatingcapacity">Seating Capacity</label>
                        <input type='number' id="seatingcapacity" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" placeholder="Type here" onChange={changeField("seatingcapacity")} value={state.seatingcapacity}/>
                    </div>
                    <div className="flex flex-col gap-1 max-w-md">
                        <label className="text-base font-medium" htmlFor="fueltype">Fuel Type</label>
                        <select id="fueltype" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" placeholder="Type here" onChange={changeField("fueltype")} value={state.fueltype}>
                            <option value="">Select Fuel Type</option>
                            {FuelTypes.map((item, index) => (
                                <option key={index} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 max-w-md">
                        <label className="text-base font-medium" htmlFor="transmission">Transmission Type</label>
                        <select id="transmission" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" placeholder="Type here" onChange={changeField("transmission")} value={state.transmission}>
                            <option value="">Select Transmission Type</option>
                            {Transmission.map((item, index) => (
                                <option key={index} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                        <label className="text-base font-medium" htmlFor="location">Location</label>
                        <input id="location" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" placeholder="Type here" onChange={changeField("location")}value={state.location} />
                    </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="description">Description</label>
                    <textarea id="description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here" onChange={changeField("description")} value={state.description}></textarea>
                </div>

                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" onChange={changeField("category")} value={state.category} >
                        <option value="">Select Car Category</option>
                        {Categories.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="price">Price Per Day</label>
                        <input type="number" name="price" id="productPrice" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required onChange={changeField("price")} value={state.price} />
                    </div>
                </div>

                    <button className="block w-full text-white bg-primary rounded-md py-3 mt-6">
                        Post Car
                    </button>
            </form>
        </div>
    );
};

export default EditorMainPage;
