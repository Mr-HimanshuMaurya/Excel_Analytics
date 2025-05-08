import {User} from "../models/userModel.js";
import httpStatus from "http-status";
import bcrypt, {hash} from "bcrypt";


const login = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({message:"Please provide detalis"})
    };
    try{
        const user = await User.find({username});
        if(!user){
            res.status(httpStatus.NOT_FOUND).json({message:"USER NOT FOUND"});
        };
        if(password){

            const isMatch = await bcrypt.compare(password, user[0].password);
            if(isMatch){
                res.status(httpStatus.OK).json({message:"LOGIN SUCCESS", user});
            }else{
                res.status(httpStatus.UNAUTHORIZED).json({message:"INVALID PASSWORD"});
            };
        }
    }catch (e){
        return res.status(httpStatus.UNAUTHORIZED).json({message:"INVALID USERNAME & PASSWORD"});;
    };
};

const register = async (req,res)=>{
    const {username, password, email} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status (httpStatus.FOUND).json({message:"USER ALREDY EXISTS"});
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username:username,
            password:hashedPassword,
            email:email,
        });
        await newUser.save();
        res.status(httpStatus.CREATED).json({message:"USER REGISTER", newUser});
    }catch(e){
        return res.status(500).json({message:"SOMETHING WENT WRONG PLEASE TRY AGAIN"});
    };
};

export {login, register}