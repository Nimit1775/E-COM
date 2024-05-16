const Users = require('../models/userModel');
const bcrypt = require('bcrypt');

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

          res.json({msg : "Register Success!"})

       }
       catch (err) {
        return res.status(500).json({msg : err.message})
       }
    }
}
module.exports = userCtr;