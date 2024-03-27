const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/sample_data"

const connectToMongo = ()=>{
  mongoose.connect(mongoURI)
    .then(() => {
      console.log("Connected to Mongo Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to Mongo: ", error);
    });
}

module.exports = connectToMongo;