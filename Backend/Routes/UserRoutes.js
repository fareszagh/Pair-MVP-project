import {Router} from "express"
import { getUserById } from "../Controllers/userController.js"
//import {addUser} from "../controllers/UserControllers.js"

const router = Router()

router.get("/getUser",getUserById)



export default router