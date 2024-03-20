import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokensAndSetCookies from"../utils/generateTokens.js"
import generateTokenAndSetCookie from "../utils/generateTokens.js";
export const signup=async(req,res)=>{
   try{
    const {fullName,username,password,confirmPassword,gender}=req.body;
    if(password!==confirmPassword){
        return res.status(400).json({error:"passwords dont match"})
    }

    const user= await User.findOne({username})
    if(user){
        res.status(400).json({error:"user already exists"});
    }
    //HASH PASSOWRD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyPic=`https://avatar.iran.liara.run/public/boy?${username}`
    const girlPic=`https://avatar.iran.liara.run/public/girl?${username}`

const newUser=new User({
    fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyPic : girlPic,
})
if(newUser){
     generateTokensAndSetCookies(newUser._id,res);
await newUser.save()
res.status(200).json({
    _id:newUser._id,
    fullName:newUser.fullName,
    username:newUser.username,
    profilePic:newUser.profilePic
})}else{
    res.status(201).json({error: "Invalid user data"})
}

   }catch(error){
    console.log("Error in signup",error.message)
    res.status(500).json({error:"iinternal server error"})
   }


}
export const login= async(req,res)=>{
    try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
export const logout=async(req,res)=>{
   try{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out succesfully"});
   }
   catch(error){
    console.log("Error in signup",error.message)
    res.status(500).json({error:"iinternal server error"})
   }
}