const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name :
    {
        type: String,
        required: true,
        
    },
    email  :
    {
        type  : String  ,
        required : true,
    },
    password : 
    {
        type : String,
        required : true,
        min : 6,
     },
     role  :
     {
            type : Number,
            default : 0
        
     },
     cart  :
     {
        type  : Array,
        default : [],

     },

} ,{
    timestamps : true
}
);

module.exports = mongoose.model('Users', userSchema);