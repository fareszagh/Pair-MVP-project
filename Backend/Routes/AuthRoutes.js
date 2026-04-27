import {Router} from "express"
import AuthMiddleware from "../Middleware/authMiddleware.js"
import { login, register } from "../Auth/authorisation.js"

const router = Router()


router.post("/register",register)
router.post("/login",login)

export default router