import {Router} from "express"
import AuthMiddleware from "../Middleware/authMiddleware.js"
import { createOffer, getAllOffers, getOfferById, removeOffer, updateOffer } from "../Controllers/offerController"

const router = Router()


router.post("/add",AuthMiddleware,createOffer)
router.get("/getAll",AuthMiddleware,getAllOffers)
router.get("/:id",AuthMiddleware, getOfferById)
router.delete("/delete/:id",AuthMiddleware,removeOffer)
router.patch("/update/:id",AuthMiddleware,updateOffer)

export default router