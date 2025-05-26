import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique:true
        },
        password:{
            type: String,
            required: true,
            
        },
        email:{
            type: String,
            required: true,
            unique:true

        },
         isAdmin: {
            type: Boolean,
            default: false // Normal users by default
        },
        signupDate: {
        type: String,
        default: () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = today.getFullYear();
            return `${day}-${month}-${year}`;
        }
}
    }
);
const User = mongoose.model('User', userSchema);
export {User}