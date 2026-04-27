import db from "../db.js"

export const createOffer = async (req, res) => {
    const { title, description, start_point, end_point, weight, height } = req.body
    try {

        const offer = await db.Offer.create({
            title, 
            description, 
            start_point,
             end_point, 
             weight, 
             height,
            created_by: req.user.id,
        })
        res.status(201).json(offer)
    } catch (err) {
        res.status(400).json(
            { 
            error: err.message 
        })
    }
}

export const getAllOffers = async (req, res) => {
  try {
    const offers = await db.Offer.findAll({
      include: [{ model: db.User, attributes: ["username", "email", "phone_number"] }],
    })
    res.json(offers);
  } catch (err) {
    res.status(500).json(
        { 
            error: err.message
         })
  }
}


export const getOfferById = async (req , res) => {

try {
    const offer = await db.Offer.findByPk(req.params.id,{
        include : [
            {model : db.User , attributes: ["usename" , "email" , "phone_number"]}
        ]
    })
    res.json(offer)
}
catch (err)
{
 res.status(500).json({
    error:err.message
 })
}

}