import { userModel } from "../models/userinfo.js";
import { allowedRoles } from "../config/allowedRols.js";
import { carModel } from "../models/carModel.js";

export const getAllUsers = async (req, res) =>
{
    const user = req.user?.id;
    if(!user) return res.status(400).json({success:false, message:"User Not Logged In!"}); 
    try
    {
        const users = await userModel.find({_id:{ $ne:user }}).select("-password")
        if(users.length === 0) return res.status(402).json({success:false, message:"No Users Found!"});
        res.status(200).json({success:true, message:"All users", data:users});
    }
    catch(err)
    {
        console.log(err);
    }
}

export const updateRoles = async (req, res) =>
{
    const user = req.user?.id;
    if(!user) return res.status(400).json({success:false, message:"User Not Logged In!"}); 
    const {userId,role} = req.body;
    if(!userId || !role) return res.status(400).json({success:false, message:"Missing Info!"}); 
    try
    {
        const userFound = await userModel.findByIdAndUpdate(userId, {role:role});
        if(!userFound) return res.status(400).json({success:false, message:"User Not Found!"}); 
        res.status(200).json({success:true, message:"Role changed successfuly"});
    }   
    catch(err)
    {
        console.log(err);
    }
}

export const removeUser = async (req, res) =>
{
    const user = req.user?.id;
    if(!user) return res.status(400).json({success:false, message:"User Not Logged In!"}); 
    const {userId} = req.body;
    if(!userId) return res.status(400).json({success:false, message:"Missing Info!"}); 
    try
    {
        const userFound = await userModel.findByIdAndDelete(userId);
        if(!userFound) return res.status(400).json({success:false, message:"User Not Found!"}); 
        res.status(200).json({success:true, message:"User Deleted Successfuly"});
    }   
    catch(err)
    {
        console.log(err);
    }
}


export const getAdminData = async (req, res) =>
{
    const user = req.user?.id;
    if(!user) return res.status(400).json({success:false, message:"User Not Logged In!"}); 
    try
    {
        const carsCount = await carModel.countDocuments();
        const usersCount = await userModel.countDocuments();
        const ApprovedCarsCount = await carModel.countDocuments({isApprouved : true});
        res.status(200).json({ success:true, data:{carsCount,usersCount, ApprovedCarsCount} });
    }
    catch(err)
    {
        console.log(err);
    }
}