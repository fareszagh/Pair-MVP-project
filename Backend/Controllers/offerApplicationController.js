import { application } from "express";
import db from "../db.js";

export const createOfferApplication = async (req, res) => {
  try {
    const { status, message } = req.body;
    const offerId = req.params.offerId; // from URL
    const userId = req.user.id; // logged-in user

    // 🔍 get user
    const user = await db.User.findByPk(userId);

    // 🚫 only transporter can apply
    if (!user || user.role !== "transporter") {
      return res.status(403).json({ message: "Only transporters can apply" });
    }

    // ✅ create application
    const newOfferApp = await db.OfferApp.create({
      offer_id: offerId,
      transporter_id: userId,
      status: status,
      message,
    });

    res.status(201).json(newOfferApp);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const updateOfferApplication = async (req , res)=>{
    try {
        const updateApp = await db.OfferApp.findByPK(req.params.id,{
            include:[
                db.Offer
            ]
        })
        const status=req.body
        if (!updateApp){
            return res.status(500).json("not found")
        }
        if (updateApp.Offer.created_by !== req.user.id){
            return res.status(500).json(" you cannot update")
        }
        updateApp.status=status
        await updateApp.save()
        res.status(200).json()
    } catch (error) {
        res.status(500).json(error)
    }
} 