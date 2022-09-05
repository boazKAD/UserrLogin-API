import fs  from " fs";
import mongoose from "mongoose";
import { Color } from  "colors";
import dotenv from "dotenv";

// load env vars
dotenv.config({path: './comfig/comfig.env'});
// load modle
import User from "./src/modles/users";
// connect to db 

mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Read Json files
const users = JSON.parse(fs.readFileSync(`${__diname}/_data/users.json`, 'utf-8'));
// Import into db 
const importData = async() =>{
    try {
        await User.create(users);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}
// delete data
const deleteData = async() =>{
    try {
        await User.deleteMany();
        console.log('Data destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}
if(process.argv[2] === '-i') {
    importData();
}  else if (process.argv [2] === '-d') {
    deleteData
}