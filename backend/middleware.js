import jwt from 'jsonwebtoken'
import User from './models/user';
import express from 'express'

export const isAuthenticated = (req,res,next)=>{
    try{
        const token = req.headers.authorization
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