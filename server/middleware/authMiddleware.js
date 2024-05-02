import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'



const protect=asyncHandler(async(req,res,next)=>{
    let token

    token=req.cookies.jwt

    if(token){
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET)

            req.user=await User.findById(decoded.userId).select('-password')
            
            next()
        } catch (error) {
            res.status(400)
            throw new Error("NOt autherised invalid token",error)
        }

    }else{
        res.status(400)
        throw new Error("NOt autherised ,no token")
    }
})



export {
    protect
}