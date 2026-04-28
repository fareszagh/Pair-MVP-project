import {Router} from "express"
import AuthMiddleware from "../Middleware/authMiddleware.js"
import { createOffer, getAllOffers, getOfferById, removeOffer, updateOffer } from "../Controllers/offerController.js"
import {
  createOfferApplication,
  getMyOfferApplications,
  getOfferApplications,
  updateOfferApplication,
} from "../Controllers/offerApplicationController.js"

const router = Router()


router.post("/add",AuthMiddleware,createOffer)
router.get("/getAll",AuthMiddleware,getAllOffers)
router.get("/applications/me",AuthMiddleware,getMyOfferApplications)
router.get("/:id",AuthMiddleware, getOfferById)
router.get("/:id/applications",AuthMiddleware,getOfferApplications)
router.post("/:offerId/applications",AuthMiddleware,createOfferApplication)
router.delete("/delete/:id",AuthMiddleware,removeOffer)
router.patch("/update/:id",AuthMiddleware,updateOffer)
router.patch("/application/:id",AuthMiddleware,updateOfferApplication)

export default router