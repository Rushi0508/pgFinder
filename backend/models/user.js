import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },
    verified:{
        type: String,
        default: false
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: 'Property'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

const User =  mongoose.model("User", userSchema);
export default User