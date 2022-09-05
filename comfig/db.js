import mongoose from  "mongoose";

mongoose.Promise = global.Promise;

const connectDB = async () => {
   const conn = await mongoose.connect(process.env.MONGO_URI , {
       useNewUrlParser: true,
       useUnifiedTopology: true
 
   })

   console.log(`MongoDB Connected: ${conn.connection.host}`
   .cyan.underline.bold
   );
 
}
export default  connectDB ;