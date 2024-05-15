const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// connect mongo 
const URI = process.env.MONGODB_URL  ;
mongoose.connect(URI, {
    
}).then(() => {
console.log('Connected to MongoDB');
}).catch(err =>{
    console.log(err);
});
