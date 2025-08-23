import { userModel } from "../models/userinfo.js";

export const verifyRoles = (roles)=>
{
    return async (req, res, next) =>
    {
        if(!req?.user)
        {
            console.log("User not logged in");
            return res.status(401).json({ message: "Unauthorized: No user logged in" });
        }
        try
        {
            const userFound = await userModel.findById(req.user.id);
            if(!userFound) return res.status(403).json({ message: "Forbidden: User not found" });
            const allowedRole = new Set(roles);
            if (!allowedRole.has(userFound.role)) {
                console.log("No access, insufficient role");
                return res.status(403).json({ message: "Forbidden: Insufficient role" });
            }
            next();
        }
        catch (err) 
        {
            console.error("Error verifying roles:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}