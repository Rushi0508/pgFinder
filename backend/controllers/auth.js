const { User } = require("../models/user")

module.exports.createUser = async(req, res)=>{
    // console.log(req.body);
    try {
        const user =  User(req.body);
        const docs = await user.save();

        console.log(docs);
        return res.status(201).json(docs);
        
    } catch (error) {
        console.log(error);
    }
}
module.exports.loginUser = async(req, res)=>{

}
module.exports.SendOtp = async(req, res)=>{

}