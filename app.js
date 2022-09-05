import bodyParser from "body-parser";
import express  from "express";
import dotenv  from "dotenv";
import morgan from "morgan";
import colors from "colors"; 
import cookieParser from "cookie-parser";
import errorHandler from "./middleWare/error";
import connectDB from "./comfig/db";

dotenv.config({path: './comfig/comfig.env'});

connectDB();
import route from "./src/routes/users.router";

const app = express();

app.use(cookieParser());

app.use(morgan(app.js));

app.use (express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/v1' ,route); 
app.use(errorHandler);


app.get('/', function(req , res ){
    res.status(200).json ({success:true, msg:'Hello john'})
});


app.listen(4001 , function(){
    console.log('server listening on port 4001');
});

//   Handle unhandled promise rejection 
//  process.on('unhandledRejection',(err,Promise) => {
//     console.log(`Error: ${err.message}`.red);
//     // close server & exit process
//     server.close(() => process.exit(1));
// });