import { Router } from "express";
import { createCar, deleteCar, updateInfo, updateStatus, getAllCars, getCar, getMyCars, updateAvailable, getAllCarsAdmin } from "../controllers/carController.js";
import { verifyAccessToken } from "../middleware/verifyAccessToken.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { allowedRoles } from "../config/allowedRols.js";

const router = Router();

// create car
router.post("/createCar",verifyAccessToken,verifyRoles([allowedRoles.Editor, allowedRoles.Admin]),createCar);
// delete car
router.delete("/deleteCar",verifyAccessToken,verifyRoles([allowedRoles.Editor, allowedRoles.Admin]),deleteCar);
// update-approuve  car (admin)
router.put("/approuveCar",verifyAccessToken,verifyRoles([allowedRoles.Admin]),updateStatus);
// update car info (owner)
router.put("/updateCar",verifyAccessToken,verifyRoles([allowedRoles.Editor]),updateInfo);

router.put("/availableCar",verifyAccessToken,verifyRoles([allowedRoles.Editor, allowedRoles.Admin]),updateAvailable); // admin for testing

router.get("/myCars", verifyAccessToken, verifyRoles([allowedRoles.Editor, allowedRoles.Admin]), getMyCars);

router.post("/allcars", getAllCars);

// get cars by search filter 
router.post("/allsearchcars", getAllCars);

router.get("/allcarsadmin", verifyAccessToken, verifyRoles([allowedRoles.Admin]), getAllCarsAdmin);

router.get("/getcar/:id", getCar);




export default router;