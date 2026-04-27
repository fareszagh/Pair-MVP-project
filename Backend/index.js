import express from "express"
import cors from "cors"
import db from "./db.js"
import userRoutes from "./Routes/UserRoutes.js"
import offerRoutes from "./Routes/OfferRoutes.js"
import dotenv from "dotenv";
dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/user",userRoutes)
app.use("/api/offer",offerRoutes)

//sequelize.sync().then(()=>{    console.log("database synced")})


const initDB = async () => {
  try {
    await db.sequelize.sync()
    console.log('Database synced successfully')
  } catch (error) {
    console.error('Error syncing database:', error.message);
  }
}


const PORT = 3000

initDB()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})