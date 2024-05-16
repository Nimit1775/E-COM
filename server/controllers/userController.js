const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const { createReadStream } = require('fs');
const jwt = require('jsonwebtoken');





const userCtr = {
    register : async(req, res) => {

       try  {
        const  { name , email , password}= req.body;
        const user =  await Users.findOne({email})
        if  ( user ) return res.status(400).json
            ({msg : "The email already exists."})
         if(password.length < 6)
            return res.status(400).json
          ({msg : "Password is at least 6 characters long."})
           
          // password encryption
          const passwordHash = await bcrypt.hash(password, 10);
          const newUser = new Users({
            name , email , password : passwordHash 

          })
          

          // save mongoDB 
            await newUser.save();
            // create jwt  to authenticate  
            const accesstoken = createAccessToken({id : newUser._id})
            const refreshtoken = createRefreshToken({id : newUser._id})
            res.cookie('refreshtoken' , refreshtoken , {
                httpOnly : true ,
                path : '/user/refresh_token'
           
            })

            res.json({accesstoken})


       }
       catch (err) {
        return res.status(500).json({msg : err.message})
       }
    } , 
     

    refreshtoken  : async ( req , res )=>{

      try {
        const rf_token = req.cookies.refreshtoken;

        if(!rf_token)return res.status(400).json({msg :" login or reguster"});
  
        jwt.verify(rf_token, process.env.REFRESH_SECRET,(err , user)=>{
          if(err)return res.status(400).json({msg : "login or register"});
          const accesstoken = createAccessToken({id : user.id})
        res.json({user , accesstoken})
        })
      }
      catch(err) {
        return res.status(500).json({msg : err.message});
      }
     
    }
  }
const createAccessToken=(payload)=>{
  return jwt.sign(payload, process.env.JWT_SECRET , {expiresIn : "1d"});

}
const createRefreshToken=(payload)=>{
  return jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn : "7d"});

}
module.exports = userCtr;