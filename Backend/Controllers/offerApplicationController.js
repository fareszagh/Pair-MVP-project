import db from "../db.js";

export const createOfferApplication = async (req, res) => {
  try {
    const { message } = req.body;
    const offerId = Number(req.params.offerId)
    const userId = req.user.id

    if (!message) {
      return res.status(400).json({ message: "message is required" })
    }

    const user = await db.User.findByPk(userId)
    const offer = await db.Offer.findByPk(offerId)

    if (!user || user.role !== "transporter") {
      return res.status(403).json({ message: "Only transporters can apply" })
    }
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" })
    }
    if (offer.created_by === userId) {
      return res.status(400).json({ message: "You cannot apply to your own offer" })
    }

    const existing = await db.OfferApp.findOne({
      where: { offer_id: offerId, transporter_id: userId },
    });
    if (existing) {
      return res.status(409).json({ message: "You already applied to this offer" })
    }

    const newOfferApp = await db.OfferApp.create({
      offer_id: offerId,
      transporter_id: userId,
      message,
    });

    res.status(201).json(newOfferApp)
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
};

export const updateOfferApplication = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updateApp = await db.OfferApp.findByPk(req.params.id)
    if (!updateApp) {
      return res.status(404).json({ message: "Application not found" })
    }

    const offer = await db.Offer.findByPk(updateApp.offer_id);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" })
    }
    if (offer.created_by !== req.user.id) {
      return res.status(403).json({ message: "You cannot update this application" })
    }

    updateApp.status = status;
    await updateApp.save()
    res.status(200).json(updateApp)
  } catch (error) {
    res.status(500).json(error)
  }
};

export const getOfferApplications = async (req, res) => {
  try {
    const offerId = Number(req.params.id)
    const offer = await db.Offer.findByPk(offerId)
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" })
    }
    if (offer.created_by !== req.user.id) {
      return res.status(403).json({ message: "You cannot view these applications" })
    }

    const applications = await db.OfferApp.findAll({
      where: { offer_id: offerId },
      order: [["createdAt", "DESC"]],
    });

    const transporterIds = [...new Set(applications.map((app) => app.transporter_id))]
    const transporters = await db.User.findAll({
      where: { id: transporterIds },
      attributes: ["id", "username", "email", "phone_number"],
    });
    const transporterById = new Map(transporters.map((user) => [user.id, user]))

    const enriched = applications.map((app) => ({
      ...app.toJSON(),
      transporter: transporterById.get(app.transporter_id) || null,
    }));

    res.status(200).json(enriched)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getMyOfferApplications = async (req, res) => {
  try {
    const applications = await db.OfferApp.findAll({
      where: { transporter_id: req.user.id },
      order: [["createdAt", "DESC"]],
    })

    const offerIds = [...new Set(applications.map((app) => app.offer_id))]
    const offers = await db.Offer.findAll({ where: { id: offerIds } })
    const offerById = new Map(offers.map((offer) => [offer.id, offer]))

    const enriched = applications.map((app) => ({
      ...app.toJSON(),
      Offer: offerById.get(app.offer_id) || null,
    }));

    res.status(200).json(enriched);
  } catch (error) {
    res.status(500).json(error);
  }
};