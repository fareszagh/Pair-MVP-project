import { DataTypes, Sequelize } from "sequelize";

const OfferApplication = (sequelize, DataTypes) => {
  return sequelize.define("OfferApp", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    offer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Offers",
        key: "id",
      },
    },
    transporter_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending",
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
export default OfferApplication;
