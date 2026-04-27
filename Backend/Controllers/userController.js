import db from "../db.js"

export const getUserById = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id)
    res.json(user)
  } catch (err) {
    res.status(500).json({ 
        error: err.message
     })
  }
}