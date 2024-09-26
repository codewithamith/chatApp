const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://localhost:27017/ChatApp`, ()=> {
  console.log('App is connected to mongodb')
})
