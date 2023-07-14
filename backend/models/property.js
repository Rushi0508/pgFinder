import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    url: String,
    filename: String
});

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    images: [imageSchema],
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    contactNo: {
        type: String,
        required: [true, "Contact required"]
    },
    unit: String,
    description: String,
    location: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates:{
            type: [Number],
            required: true
        }

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Property = mongoose.model("Property", propertySchema);
export default Property
