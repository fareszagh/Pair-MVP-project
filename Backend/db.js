import { DataTypes,Sequelize } from "sequelize";
import "dotenv/config" ;
import Offer from "./Models/OfferModel.js"
import OfferApp from "./Models/OfferApplicationModel.js"
import UserModel from "./Models/UserModel.js";


//connection with database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: 'mysql'
});


const db={}

db.User=UserModel(sequelize,DataTypes)
db.Offer=Offer(sequelize,DataTypes)
db.OfferApp=OfferApp(sequelize,DataTypes)
db.sequelize=sequelize

db.User.hasMany(db.Offer, { foreignKey: "created_by" });
db.Offer.belongsTo(db.User, { foreignKey: "created_by" });

db.User.belongsToMany(db.Offer, {
  through: db.OfferApp,
  foreignKey: "transporter_id"
});

db.Offer.belongsToMany(db.User, {
  through: db.OfferApp,
  foreignKey: "offer_id"
});
db.Offer.hasMany(db.OfferApp,{foreignKey:"offer_id"})
db.OfferApp.belongsTo(db.Offer,{foreignKey:"offer_id"})




await sequelize.sync();
export default db;