import jwt from 'jsonwebtoken'
import User from './models/user';
import express from 'express'

const isAuthenticated = async(req,res,next)=>{
    try{
        const token = req.headers['Authorization']
        if(token){
            jwt.verify(token, process.env.JWT_SECRET, async(err,decodedToken)=>{
                if(err){
                    res.json({loginRequired: true});
                }
                else{
                    const userId = decodedToken.user.id;
                    const user = await User.findById(userId);
                    if(!user){
                        res.json({loginRequired: true});
                    }
                    next();
                }
            })
        }else{
            res.json({loginRequired: true});
        }
    }catch(err){
        res.json({loginRequired: true});
    }
}