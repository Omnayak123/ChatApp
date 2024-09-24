import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';
const protectRoute= async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorized -No token provided"})
        }
        const decoded=jwt.verify(token,"uTbDqdkiq4WhsiwBgZLwboKBdu8oMC6I0Rc13WEhpU0");
        if(!decoded){
            return res.status(401).json({error:"Unauthorized -invalid Token"});

        }

        const user=await User.findById(decoded.userId).select("-password");

        req.user=user;
        next();
    }
    catch(error){
       console.log("Error in protectRoute middleware",error.message);
       res.status(500).json({error:"Internal server error"});

    }
}

export default protectRoute