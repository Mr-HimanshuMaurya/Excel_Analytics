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
    const {username, password, email, isAdmin} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status (httpStatus.FOUND).json({message:"USER ALREDY EXISTS"});
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
        username,
        password: hashedPassword,
        email,
        isAdmin: isAdmin || false 
    });
        await newUser.save();
        res.status(httpStatus.CREATED).json({message:"USER REGISTER", newUser});
    }catch(e){
        return res.status(500).json({message:"SOMETHING WENT WRONG PLEASE TRY AGAIN"});
    };
};

// Add fileName to user's history (create field if it doesn't exist)
const addToHistory = async (req, res) => {
    const { username, fileName, timestamp } = req.body;
  try {
    await User.updateOne(
      { username },
      { $push: { history: { fileName, timestamp } } }
    );
    res.json({ message: 'History updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add history' });
  }
};
//   const { username, fileName } = req.body;

//   if (!username || !fileName) {
//     return res.status(400).json({ message: "Username and fileName are required" });
//   }

//   try {
//     const user = await User.findOne({ username });
//     console.log("Adding to user:", user.username);

 


//     if (!user) {
//       return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
//     }

//     // Initialize history if it doesn't exist
//     if (!user.history) {
//       user.history = [];
//     }

//     user.history.push({ fileName, timestamp: new Date() });
//      console.log("Current history:", user.history);
//     await user.save();

    

//     res.status(httpStatus.OK).json({ message: "History updated", history: user.history });
//   } catch (e) {
//     res.status(500).json({ message: "Error updating history", error: e.message });
//   }
// };

const getUserHistory = async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }

  try {
    const user = await User.findOne({ username });
    console.log("Fetched user:", user.username);
    


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Make sure history exists, even if empty
    const history = user.history || [];
    
console.log("Fetched history:", user.history);


    res.status(200).json({ history: user.history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) });

  } catch (e) {
    return res.status(500).json({ message: "Error retrieving history", error: e.message });
  }
};


const deleteFromHistory = async (req, res) => {
  const { username, itemId } = req.body;

  if (!username || !itemId) {
    return res.status(400).json({ message: 'Username and itemId are required.' });
  }

  try {
    // Adjust model as needed based on your DB schema
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.history = user.history.filter(item => item._id.toString() !== itemId);
    await user.save();

    return res.status(200).json({ message: 'History item deleted successfully.' });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};



export {login, register, addToHistory, getUserHistory, deleteFromHistory}