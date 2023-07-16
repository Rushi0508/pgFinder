import dotenv from 'dotenv'
dotenv.config();
import Property from "../models/property";
import User from '../models/user'
import mongoose from "mongoose";
// import { cloudinary } from "../cloudinary";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
const geocoder = mbxGeocoding({accessToken: process.env.MAPBOX_TOKEN});

export const createProperty = async (req,res)=>{
    try{
        const userId = req.body.userId;
        const user = await User.findById(userId)
        if(!user){
            throw new Error("User not found");
        }
        const property = new Property(req.body);
        if(req.body.coordinates){
            property.geometry.type = "Point"
            property.geometry.coordinates = req.body.coordinates;
        }else{
            const geoData = await geocoder.forwardGeocode({
                query: req.body.location,
                limit: 1
            }).send();
            property.geometry = geoData.body.features[0].geometry
        }
        // property.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
        property.author = req.body.userId;
        user.property.push(property);
        await property.save();
        await user.save();
        res.json({status: true, property: property})
    }catch(err){
        res.json({status: false, error: err.message})
    }
}

export const editProperty = async (req, res)=>{
    try{
        const userId = req.body.userId;
        const user = await User.findById(userId)
        if(!user){
            throw new Error("User not found");
        }
        const propertyId = req.params.id;
        const property = await Property.findByIdAndUpdate(propertyId, {...req.body});
        if(!property){
            throw new Error("Property not found");
        }
        // property = req.body;
        const geoData = await geocoder.forwardGeocode({
            query: req.body.location,
            limit: 1
        }).send();
        property.geometry = geoData.body.features[0].geometry;
        property.updatedAt = Date.now();
        await property.save();
        res.json({status: true})
    }catch(err){
        res.json({status: false, error: err.message})
    }
}

export const deleteProperty = async(req,res )=>{
    try{
        const propertyId = req.params.id;
        const property = await Property.findByIdAndDelete(propertyId);
        if(!property){
            throw new Error("Property not found");
        }
        const user = await User.findByIdAndUpdate(property.author,{$pull: {property: propertyId}})
        res.json({status: true})
    }catch(err){
        res.json({status: false, error: err.message})
    }
}

export const nearestProperty = async (req,res)=>{
    try{
        let property;
        if(req.body.search){
            console.log(req.body.search);
            const search = req.body.search;
            const regex = new RegExp(search, 'i');
            property = await Property.find({ location: { $regex: regex } });

        }
        else{
            const {userId, latitude, longitude} = req.body;
            console.log(req.body);
            property = await Property.aggregate([
                {
                    $geoNear:{
                        near: {type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)]},
                        key: "geometry",
                        maxDistance: parseFloat(400)*1000,
                        distanceField: "dist.calculated",
                        spherical: true   
                    }
                },
                // {
                //     $match: {
                //         author: { $ne: new mongoose.Types.ObjectId(userId) }
                //     }
                // }
            ])
        }
        console.log(property);
        res.json({status: true, data: property})
    }catch(err){
        res.json({status: false, error: err.message})
    }
}

export const getProperty = async (req, res)=>{
    try{
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);
        if(!property){
            throw new Error('Property not found');
        }
        res.json({status: true, property: property});
    }catch(err){
        res.json({status: false, error: err.message});
    }
}

export const getUserProperty = async(req,res)=>{
    try{
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(!user){
            throw new Error('User not found');
        }
        const property = await Property.find({author: userId});
        if(property){
            res.json({status: true, data: property})
        }
    }catch(err){
        res.json({status: false, error: err.message});
    }
}