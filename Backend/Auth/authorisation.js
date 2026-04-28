import db from "../db.js";
import bcrypt from "bcrypt";
import { json } from "express";
import jwt from "jsonwebtoken";

export const login = async (req , res ) => {
    try {
        const {email , password} = req.body;

        //find user
        const user = await db.User.findOne({where :{email}})
        if (!user){
            return res.status(404).json({message: "User does not exist"})
        }
        //check if password match
        const ismatch = await bcrypt.compare(password,user.password)
        if (!ismatch) {
            return res.status(401).json ({message : "password is not correct"})
        }

        //generate token
        const token = jwt.sign(
            {id:user.id,email:user.email},
            process.env.JWT_SECRET ,
            {expiresIn: "1d"}
        )

        res.status(200).json({
            message:"login successful",
            token
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


export const register = async (req ,res )=>{
    try {
        const {username,email,password,phone_number,role}=req.body

        //check if user exist
        const userexist= await db.User.findOne({ where: { email }})
        if (userexist){
            return res.status(400).json({message: "Email exist already"})
        }

        //hash password
        const hashedpassword= await bcrypt.hash(password,10)

        //create user
        const user =await db.User.create({
            username,
            email,
            password :hashedpassword,
            phone_number,
            role
        })

        res.status(201).json({
            id: user.id,
            username:user.username,
            email:user.email,
            phone_number:user.phone_number,
            role:user.role
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
