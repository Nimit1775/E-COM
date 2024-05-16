const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// routes  
app.use('/user' , require('./routes/userRoute'));
 



// connect mongo 
const URI = process.env.MONGODB_URL  ;
mongoose.connect(URI, {

    
}).then(() => {
console.log('Connected to MongoDB');
}).catch(err =>{
    console.log(err);
});
