import { Router } from "express";
import { createBooking, deleteBooking, updateBooking, allBookings, myBookings, cancelBooking, allEditorBookings } from "../controllers/bookingsController.js";
import { verifyAccessToken } from "../middleware/verifyAccessToken.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { allowedRoles } from "../config/allowedRols.js";
const router = Router();

// create booking
router.post("/createBooking",verifyAccessToken,verifyRoles([allowedRoles.User, allowedRoles.Admin]),createBooking); // admin for testing
// delete booking (admin/ editer)
router.delete("/deleteBooking",verifyAccessToken,deleteBooking); 
// update booking (Admin) 
router.put("/updateBooking",verifyAccessToken,verifyRoles([allowedRoles.Editor]),updateBooking);
// cancel booking (user / editer)
router.put("/cancelBooking",verifyAccessToken,verifyRoles([allowedRoles.Editor, allowedRoles.User]),cancelBooking);
// all bookings (admin) 
router.get("/allBookings",verifyAccessToken,verifyRoles([allowedRoles.Admin]),allBookings);
// all bookings (editor) 
router.get("/allEditorBookings",verifyAccessToken,verifyRoles([allowedRoles.Editor, allowedRoles.Admin]),allEditorBookings);
// my bookings
router.get("/myBookings",verifyAccessToken,myBookings);

export default router;