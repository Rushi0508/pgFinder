import mongoose from "mongoose"

const Schema = mongoose.Schema;

const userVerificationSchema = new Schema({
    userId: String,
    otp: String,
    createdAt: {
        type: Date,
        default: Date.now() 
    },
    expiresAt: {
        type: Date
    }
})

const UserVerification = mongoose.model("UserVerification", userVerificationSchema);
export default UserVerification