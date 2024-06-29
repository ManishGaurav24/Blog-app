const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://contactmgaurav:Pass123@cluster0.ijy7vh7.mongodb.net/blogs?retryWrites=true&w=majority";
const connectDb = async () => {

    const connection = await mongoose.connect(MONGO_URI);
    if(connection) console.log("Database connected");
    else console.log("Database connection failed");

}

module.exports = {connectDb}