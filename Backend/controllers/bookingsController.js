import mongoose from "mongoose";
import { bookingModel } from "../models/bookingInfo.js";
import { carModel } from "../models/carModel.js";
import { userModel } from "../models/userinfo.js";

// create booking
export const createBooking = async (req, res) => 
{
    const { car, pickupDate, returnDate } = req.body;
    const user = req.user?.id;

    if (!user) return res.status(400).json({ success: false, message: "User not logged in." });
    if (!car || !pickupDate || !returnDate)
    return res.status(400).json({ success: false, message: "Missing booking details." });

    if (new Date(pickupDate) > new Date(returnDate)) return res.status(400).json({ success: false, message: "Return date must be after pickup date." });
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try 
    {
        const carFound = await carModel.findOneAndUpdate(
            { 
                _id: car,
                isAvailable: true,
                $or: [
                    { bookedFrom: null, bookedTo: null },
                    { bookedTo: { $lt: new Date(pickupDate) } },  
                    { bookedFrom: { $gt: new Date(returnDate) } } 
                ]
            },
            { isAvailable: false, bookedFrom:pickupDate, bookedTo:returnDate },
            { new: true , session}
        );
        if (!carFound) 
        {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ success: false, message: "Car not available or does not exist." });
        }

        const userFound = await userModel.findById(user).session(session);
        if (!userFound) 
        {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ success: false, message: "User not found." });
        }

        const newBooking = new bookingModel({
            car,
            user,
            owner: carFound.owner,
            pickupDate,
            returnDate,
            pickUpLocation: carFound.location,
            returnLocation: carFound.location,
            price: Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)) * carFound.pricePerDay
        });
        await newBooking.save({session});

        userFound.myBooking.push(newBooking._id);
        await userFound.save({session});

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({ success: true, message: "Booking created successfully.", booking: newBooking });
    } 
    catch (err) 
    {
        await session.abortTransaction();
        session.endSession();
        console.error(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};


// delete booking (admin/ editer)

export const deleteBooking = async (req, res) => 
{
    const user = req.user?.id;
    if(!user) return res.status(400).json({ success: false, message: "User Not Logged In!" });
    const { booking } = req.body;
    if (!booking) return res.status(400).json({ success: false, message: "Booking ID is required!" });

    const session = await mongoose.startSession();
    session.startTransaction();
    try 
    {
        const bookingFound = await bookingModel.findById(booking);
        if(!bookingFound) return res.status(400).json({ success: false, message: "Booking Not Found!" });
        const isOwner = bookingFound.owner.toString() === user;
        const isUser = bookingFound.user.toString() === user;
        const isAdmin = userfound.role === 4000;

        if (!isOwner && !isUser && !isAdmin) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ success: false, message: "Invalid Request!" });
        }

        const bookingDeleted = await bookingModel.findByIdAndDelete(booking, {session});
        if (!bookingDeleted)
        {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ success: false, message: "Booking Not Deleted!" });
        } 
        

        await userModel.findByIdAndUpdate(bookingDeleted.user, { $pull: { myBooking: bookingDeleted._id }}, {session});

        await carModel.findByIdAndUpdate(bookingDeleted.car, { isAvailable: true, bookedFrom:null, bookedTo:null}, {session});
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ success: true, message: "Booking Deleted Successfully!", booking: bookingDeleted });
    } 
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};


// update booking (editer) 

export const updateBooking = async (req, res) =>
{
    const {booking, status} = req.body;
    if (!booking) return res.status(400).json({ success: false, message: "Booking ID is required!" });
    const session = await mongoose.startSession();
    session.startTransaction();
    try
    {
        const bookingUpdated = await bookingModel.findByIdAndUpdate(booking, {status},{new:true, session});
        if (!bookingUpdated)
        {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ success: false, message: "Booking Updated !" });
        } 
        await carModel.findByIdAndUpdate(bookingUpdated.car, { isAvailable: true }, {session});
        await session.commitTransaction();
        session.endSession();
        res.status(204).json({ success: true, message: "Booking Updated Successfully!", booking: bookingUpdated });

    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

// cancel booking (user / editer)

export const cancelBooking = async (req, res) => 
{
    const { booking,status } = req.body;
    const user = req.user?.id;
    if (!user) return res.status(400).json({ success: false, message: "User ID is required!" });
    if (!booking) return res.status(400).json({ success: false, message: "Booking ID is required!" });
    
    const session = await mongoose.startSession();
    session.startTransaction();
    try
    {
        const userfound = await userModel.findById(user).session(session);
        const bookingFound = await bookingModel.findById(booking).session(session);
        if (!bookingFound) 
        {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ success: false, message: "Booking not found." });
        }
        const carFound = await carModel.findById(bookingFound.car).session(session);
        if (!carFound) 
        {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ success: false, message: "Car not found." });
        }
        // check valid user
        const isOwner = carFound.owner.toString() === user;
        const isUser = bookingFound.user.toString() === user;
        const isAdmin = userfound.role === 4000;

        if (!isOwner && !isUser && !isAdmin) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ success: false, message: "Invalid Request!" });
        }

        
        const bookingUpdated = await bookingModel.findByIdAndUpdate(booking, {status: status||"canceled"},{new:true, session});
        await userModel.findByIdAndUpdate(user, { $pull: { myBooking: bookingFound._id } }, {session});
        await carModel.findByIdAndUpdate(bookingFound.car, { isAvailable: true,bookedFrom:null, bookedTo:null}, {session});
        
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ success: true, message: "Booking Canceled Successfully!", booking: bookingUpdated });
    } 
    catch (err) 
    {
        await session.abortTransaction();
        session.endSession();
        console.log(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};


// all bookings (admin) 

export const allBookings = async (req, res) =>
{
    try
    {
        const allBookings = await bookingModel.find().sort({ createdAt: -1 });
        if(!allBookings || allBookings.length === 0) return res.status(404).json({ success: false, message: "No Bookings!" });
        res.status(200).json({ success: true, message: "All Bookings Retrieved Successfully!", allBookings: allBookings });
    }
    catch (err) 
    {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

// all bookings (editor) 

export const allEditorBookings = async (req, res) =>
{  
    const user = req.user?.id;
    const populate = req.query.populate === "true";
    if(!user) return res.status(400).json({ success: false, message: "User ID is required!" });
    try
    {
        const userFound = await userModel.findById(user);
        if(!userFound) return res.status(400).json({ success: false, message: "User Not Found!" });
        let query;
        if(populate)
        {
            query = bookingModel.find({owner:user}).populate("car").sort({ createdAt: -1 });
        }
        else
        {
            query = bookingModel.find({owner:user}).sort({ createdAt: -1 });
        }
        const myBookings = await query;
        res.status(200).json({ success: true, message: "Booking Retrieved Successfully!", myCarsBookings: myBookings });
    }
    catch (err) 
    {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

// my bookings

export const myBookings = async (req, res) =>
{
    const user = req.user?.id;
    const populate = req.query.populate === "true";
    if(!user) return res.status(400).json({ success: false, message: "User ID is required!" });
    try
    {
        const userFound = await userModel.findById(user);
        if(!userFound) return res.status(400).json({ success: false, message: "User Not Found!" });
        let query;
        if(populate)
        {
            query = bookingModel.find({_id: {$in: userFound.myBooking}}).populate("car").populate("owner").sort({ createdAt: -1 });
        }
        else
        {
            query = bookingModel.find({_id: {$in: userFound.myBooking}}).sort({ createdAt: -1 });
        }
        const myBookings = await query;
        res.status(200).json({ success: true, message: "Booking Retrieved Successfully!", myBookings: myBookings });
    }
    catch (err) 
    {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}