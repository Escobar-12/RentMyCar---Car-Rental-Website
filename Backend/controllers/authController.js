import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { userModel } from "../models/userinfo.js";
import { allowedRoles } from "../config/allowedRols.js";

export const register = async (req, res) =>
{
    const {name, email, password, img} = req.body;
    if(!name || !email || !password) return res.status(400).json({success:false, message:"Missing credentials"});
    try
    {
        const userFoundWithEmail = await userModel.findOne({email});
        const userFoundWithName = await userModel.findOne({name});
        if (userFoundWithEmail || userFoundWithName) {
            return res.status(409).json({ success: false, message: "User already exists." });
        }
        const hashedPwd = await bcrypt.hash(password,10);
        const role = allowedRoles.User; 
        const newUser = await userModel.create({
            name,email,role,img,
            password:hashedPwd,
        });

        const Access_token = jwt.sign(
            {id:newUser._id,name,role},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"10m"}
        );

        const Refresh_token = jwt.sign(
            {id:newUser._id,name,role},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"1d"}
        );

        res.cookie("jwt", Refresh_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "Lax"
        });

        return res.status(200).json(
            {
                id:newUser._id,
                user:newUser.name,
                Access_token,
                role: newUser.role,
                profile:newUser.img
            }
        );
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: "Error while registering" });
    }
}


export const login = async (req, res) =>
{
    const {name, email, pwd} = req.body;
    if((!name && !email) || ! pwd) return res.status(400).json({success:false, message: "Missing credentials"});
    try
    {
        const userFound = await userModel.findOne({$or:[{name},{email}]});
        const checkPwd = await bcrypt.compare(pwd, userFound.password);
        if(!checkPwd || !userFound )  return res.status(401).json({success:false, message:"Invalid username or password"});

        const Access_token = jwt.sign(
            {
                id:userFound._id, name:name, role:userFound.role
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'10m'}
        );
        const Refresh_token = jwt.sign(
            {
                id:userFound._id, name:name, role:userFound.role
            }, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'1d'}
        );
        res.cookie('jwt', Refresh_token, {
            httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite:"Lax", //secure:true
        })

        res.status(200).json({
            id:userFound._id,
            user:userFound.name,
            Access_token,
            role:userFound.role,
            profile:userFound.img
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

export const logout = async (req, res) =>
{
    try
    {
        const cookies = req.cookies;
        if(!cookies?.jwt) 
        {
            return res.status(204).json({ success: true, message: "No content, user already logged out." });
        }
        res.clearCookie("jwt",{httpOnly: true, sameSite:"Lax"});
        return res.status(200).json({ success: true, message: "Logged out successfully" });
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}


export const refresh = async (req, res) => 
{
    const refreshToken = req.cookies?.jwt;
    if(!refreshToken) return res.status(401).json({success:false, message:"No token found"});
    
    try
    {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign(
            { id: decoded.id, name: decoded.name, role: decoded.role },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "10m"}
        )
        const userFound = await userModel.findById(decoded.id);
        if(!userFound) return res.status(401).json({success:false,message:"Server Error"})
        res.json({ 
            id:decoded.id,
            user: decoded.name,  
            Access_token: newAccessToken, 
            role: decoded.role ,
            profile:userFound.img
        });
    }
    catch(err)
    {
        console.error("Error verifying refresh token:", err);
        res.clearCookie("jwt",{httpOnly: true, sameSite:"Lax"});
        res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
}
