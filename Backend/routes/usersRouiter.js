import { Router } from "express";
import { verifyAccessToken } from "../middleware/verifyAccessToken.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { allowedRoles } from "../config/allowedRols.js";
import { getAllUsers, updateRoles, removeUser, getAdminData } from "../controllers/usersController.js";

const router = Router();

// get all users (admin) 
router.get("/allusers", verifyAccessToken, verifyRoles([allowedRoles.Admin]), getAllUsers);
router.put("/updateUserRole", verifyAccessToken, verifyRoles([allowedRoles.Admin]), updateRoles)
router.post("/removeUser", verifyAccessToken, verifyRoles([allowedRoles.Admin]), removeUser)
router.get("/getAdminData", verifyAccessToken, verifyRoles([allowedRoles.Admin]), getAdminData);

export default router;