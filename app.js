require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes= require("./src/routes/auth")
const userRoutes= require("./src/routes/user")

//connect to database
try{
    mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log('connected to database')
} catch (errr) {
    console.error(errr)
}
process.on('unhandledRejection', err=> console.log('rejection', err.message));
//parse requests of type json
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//routes auth
app.use(authRoutes);
//users
app.use(userRoutes);

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is live on port "+process.env.PORT);
})
