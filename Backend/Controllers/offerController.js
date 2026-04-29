import db from "../db.js";
import { Op } from "sequelize";

export const createOffer = async (req, res) => {
  const { title, description, start_point, end_point, weight, height } =
    req.body;
  try {
    const offer = await db.Offer.create({
      title,
      description,
      start_point,
      end_point,
      weight,
      height,
      created_by: req.user.id,
    });
    res.status(201).json(offer);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getAllOffers = async (req, res) => {
  try {
    const offers = await db.Offer.findAll({
      include: [
        { model: db.User, attributes: ["username", "email", "phone_number"]
         },
     {
        model: db.OfferApp,
        foreignKey:"offer_id"
     }
      ],
    });
    res.json(offers);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const getOfferById = async (req, res) => {
  try {
    const offer = await db.Offer.findByPk(req.params.id, {
      include: [
        { model: db.User, attributes: ["username", "email", "phone_number"] },
      ],
    });
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json(offer);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const removeOffer = async (req, res) => {
  try {
    const deleteOffer = await db.Offer.destroy({
      where: { id: req.params.id },
    });
    res.status(204).json({
      message: "deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateOffer = async (req, res) => {
  try {
    const updatedOffer = await db.Offer.findByPk(req.params.id);
    await updatedOffer.update(req.body);
    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const searchOffer = async (req, res) => {
  try {
    // search query from URL
    const search = req.query.search || "";

    const offers = await db.Offer.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            start_point: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            end_point: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },

      include: [
        {
          model: db.User,
          attributes: ["username", "email", "phone_number"],
        },
      ],
    });

    res.json(offers);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
