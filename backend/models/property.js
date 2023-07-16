import mongoose from 'mongoose'

// const imageSchema = new mongoose.Schema({
    
// });

// imageSchema.virtual('thumbnail').get(function () {
//     return this.url.replace('/upload', '/upload/w_200');
// });

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    images: {type: [String]},
    price: {
        type: String,
        required: [true, "Price is required"]
    },
    unit: String,
    contactNo: {
        type: String,
        required: [true, "Contact required"]
    },
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
