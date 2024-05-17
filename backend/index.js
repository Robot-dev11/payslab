require('dotenv').config()
const express = require("express");
const PORT = process.env.PORT || 3000 
const rootRouter = require('./routes/index');
const cors = require('cors');
const mongoose = require('mongoose');



const app = express();

app.use(cors());
app.use("/api/v1", rootRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(process.env.DB_URL)
}



app.listen(PORT, err => {
    if(err) console.log(err);
    console.log(" Server Listening on PORT: ", PORT);
})