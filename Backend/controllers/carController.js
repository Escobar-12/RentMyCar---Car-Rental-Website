import { bookingModel } from "../models/bookingInfo.js";
import { carModel } from "../models/carModel.js";
import { userModel } from "../models/userinfo.js";
import mongoose from "mongoose";
import { myBookings } from "./bookingsController.js";


// create car
export const createCar = async (req, res) =>
{
    const {brand, model, year,category, seating_capacity,
        fuel_type, transmission,pricePerDay, location,
        description, images} = req.body;
        
    if(!req.user) return res.status(400).json({success:false, message:"User Not Logged In!"}); 

    if(!brand || !model || !year || !category || seating_capacity == null ||
        !fuel_type || !transmission || pricePerDay == null || !location || !description || !images) return res.status(400).json({success:false, message:"Car Info Missing!"}); 

    try
    {
        const car = await carModel.create({owner:req.user.id, brand, model, year,category, seating_capacity,
        fuel_type, transmission,pricePerDay, location,
        description, image:images});
        if(!car) return res.status(400).json({success:false, message:"No Car Added!"}); 
        res.status(200).json({success: true, car:car._id});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

// delete car

export const deleteCar = async (req, res) => {
    const { carId } = req.body;
    if (!carId) {
        return res.status(400).json({ success: false, message: "No Car ID!" });
    }
    const user = req.user?.id;
    if(!user) return res.status(400).json({success:false, message:"User Not Logged In!"}); 
    try 
    {
        const editor = await userModel.findById(req.user?.id);
        if (!editor) return res.status(404).json({ success: false, message: "User not found!" });

        const car = await carModel.findById(carId);
        if (!car) return res.status(404).json({ success: false, message: "Car not found!" });

        const isOwner = car.owner.toString() === editor._id.toString();
        const isAdmin = editor.role === 4000;

        if (!isOwner && !isAdmin) return res.status(403).json({ success: false, message: "User not allowed to delete this car." });
        // find and delete car
        const deleted = await carModel.findByIdAndDelete(carId);
        if (!deleted) return res.status(400).json({ success: false, message: "No Car Deleted!" });
        // remove the car from owner's list
        await userModel.findByIdAndUpdate(
            editor._id,
            { $pull: { mycars: carId } },
            { new: true }
        );
        // find all bookings with this car
        const bookingsToDelete = await bookingModel.find({ car: carId });
        // get users and bookings to delete
        const usersIds = bookingsToDelete.map(b => b.user);
        const bookingsIds = bookingsToDelete.map(b => b._id);
        // remove from user's bookings list
        await userModel.updateMany({_id: {$in: usersIds}},
            {$pull: {myBookings: {$in : bookingsIds}}}
        ); 
        // delete all bookings with this car 
        await bookingModel.deleteMany({_id : {$in : bookingsIds}})
        return res.status(200).json({ success: true, message: "Car deleted successfully." });
    } 
    catch (err) 
    {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

// update-approuve  car (admin)

export const updateStatus = async (req, res) =>
{
    const {carId, isApprouved} = req.body;
    if(!carId) return res.status(400).json({success:false, message:"No Car ID!"}); 
    try
    {
        const carUpdated = await carModel.findByIdAndUpdate(carId,{isApprouved});
        if(!carUpdated) return res.status(400).json({success:false, message:"No Car Updated!"}); 
        res.status(200).json({success: true, message: "Car Updated Successfully", car:carUpdated});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

// update car info (owner)

export const updateInfo = async (req, res) => {
    const { carId, ...updateFields } = req.body;

    if (!carId) return res.status(400).json({ success: false, message: "No Car ID provided!" });

    try 
    {
        const editorFound = await userModel.findById(req.user?.id);
        if (!editorFound) return res.status(404).json({ success: false, message: "User not found!" });
        const carFound = await carModel.findById(carId);
        if (!carFound) return res.status(404).json({ success: false, message: "Car not found!" });

        const isOwner = carFound.owner.toString() === editorFound._id.toString();
        const isAdmin = editorFound.role === 4000;
        if (!isOwner && !isAdmin) return res.status(403).json({ success: false, message: "User not allowed to update this car." });

        const carUpdated = await carModel.findByIdAndUpdate(carId, updateFields, { new: true });

        if (!carUpdated) return res.status(400).json({ success: false, message: "Car not updated." });

        res.status(200).json({ success: true, message: "Car updated successfully.", car: carUpdated });

    }
    catch (err) 
    {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

// update car available (owner)

export const updateAvailable = async (req, res) => {
    const { carId, isAvailable } = req.body;

    if (!carId) return res.status(400).json({ success: false, message: "No Car ID provided!" });

    try 
    {
        const editorFound = await userModel.findById(req.user?.id);
        if (!editorFound) return res.status(404).json({ success: false, message: "User not found!" });
        const carFound = await carModel.findById(carId);
        if (!carFound) return res.status(404).json({ success: false, message: "Car not found!" });

        const isOwner = carFound.owner.toString() === editorFound._id.toString();
        const isAdmin = editorFound.role === 4000;
        if (!isOwner && !isAdmin) return res.status(403).json({ success: false, message: "User not allowed to update this car." });

        const carUpdated = await carModel.findByIdAndUpdate(carId, {isAvailable:isAvailable}, { new: true });

        if (!carUpdated) return res.status(400).json({ success: false, message: "Car not updated." });

        res.status(200).json({ success: true, message: "Car updated successfully.", car: carUpdated });

    }
    catch (err) 
    {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

// get car

export const getCar = async (req, res) =>
{
    const carId = req.params.id;
    if (!carId) return res.status(400).json({ success: false, message: "No Car ID provided!" });
    if (!mongoose.Types.ObjectId.isValid(carId)) return res.status(400).json({ success: false, message: "Invalid Car ID format!" });
    try
    {
        const cars = await carModel.findById(carId);
        res.status(200).json({ success: true, data: cars });
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

// get all cars

export const getAllCars = async (req, res) => {
    try 
    {
        const {search="", priceRange=[0,1000], count=6} = req.body;
        const { location, pickupDate, returnDate } = req.query;
        let carFilter = { isApprouved: true };
        if (location) carFilter.location = decodeURIComponent(location);

        let validPeriodCars = [];

        if (pickupDate && returnDate) 
        {
            const pp = new Date(decodeURIComponent(pickupDate));
            const ret = new Date(decodeURIComponent(returnDate));

            const validPeriodBookings = await bookingModel.find({
                $or: 
                [
                    { returnDate: { $lte: pp } },   
                    { pickupDate: { $gte: ret } },
                ]
            }).select("car");

            const carIds = [...new Set(validPeriodBookings.map(b => b.car.toString()))];

            if (carIds.length > 0) 
            {
                validPeriodCars = await carModel.find({ ...carFilter, _id: { $in: carIds } }).sort({ createdAt: -1 });
            }
        }

        const availableCars = await carModel.find({...carFilter, isAvailable: true});

        const allCarsMap = new Map();
        [...availableCars, ...validPeriodCars].forEach(car => 
            {
                allCarsMap.set(car._id.toString(), car);
            }
        );
        let allCars = Array.from(allCarsMap.values());
        const searchParam = (search || "").toLowerCase();
        if (searchParam) {
            allCars = allCars.filter(car =>
                (
                    car.brand?.toLowerCase().includes(searchParam) ||
                    car.model?.toLowerCase().includes(searchParam) ||
                    car.category?.toLowerCase().includes(searchParam) ||
                    car.transmission?.toLowerCase().includes(searchParam) ||
                    car.fuel_type?.toLowerCase().includes(searchParam) 
                )
            );
        }
        const price = Array.isArray(priceRange) && priceRange.length === 2 ? priceRange : [0, 1000];
        if(price)
        {
            allCars = allCars.filter(car => Number(car.pricePerDay || 0) >= price[0] && Number(car.pricePerDay || 0) <= price[1] )
        }
        res.status(200).json({ success: true, data:allCars.slice(count,count+6), message: carFilter});
    } 
    catch (err) 
    {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

// get all cars (admin)

export const getAllCarsAdmin = async (req, res) =>
{
    try
    {
        const cars = await carModel.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: cars })
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

// get all cars (editor)

export const getMyCars = async (req, res) =>
{
    const user = req.user?.id;
    if(!user) return res.status(400).json({success:false, message:"User Not Logged In!"});
    try
    {
        const cars = await carModel.find({ owner:user }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, cars: cars });
    }
    catch (err) 
    {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}