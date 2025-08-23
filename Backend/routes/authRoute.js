import { Router } from "express"; 
import { login, logout, register, refresh } from "../controllers/authController.js";
import { verifyAccessToken } from "../middleware/verifyAccessToken.js";
import { userModel } from "../models/userinfo.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { allowedRoles } from "../config/allowedRols.js";
import ImageKit from "imagekit";


const router = Router();
router.post("/login",login);
router.post("/register",register);
router.post("/logout", logout);
router.get("/refresh", refresh);


router.get("/me", verifyAccessToken, async (req, res)=> 
{
    try 
    {
        const user = await userModel.findById(req.user.id).select("-password");
        if(!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ 
            user: user.name, 
            roles: user.role,
            profile: user.img,
            id:user._id
        });
    }
    catch(err)
    {
        res.status(500).json({ message: "Server error", error: err.message });
    }
})
router.get("/isAdmin",verifyAccessToken,verifyRoles([allowedRoles.Admin]), (req,res)=>
{
    return res.status(200).json({success:true, message:4000});
})
router.get("/isEditor",verifyAccessToken,verifyRoles([allowedRoles.Editor]), (req,res)=>
{
    return res.status(200).json({success:true, message:3000});
})

export default router;
