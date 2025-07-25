import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
            username: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            isAdmin: {
                type: Boolean,
                default: false
            },
            signupDate: {
                type: String,
                default: () => {
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const year = today.getFullYear();
                return `${day}-${month}-${year}`;
                }
            },
            history: [
                {
                fileName: {
                    type: String,
                    required: true
                },
                timestamp: {
                    type: Date,
                }
                }
            ]
});

const User = mongoose.model('User', userSchema);
export { User };
