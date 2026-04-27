import jwt from "jsonwebtoken"

const verifyToken = (req , res, next)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded
    next()
}
export default verifyToken