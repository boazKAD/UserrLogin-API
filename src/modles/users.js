import mongoose from "mongoose";
import  bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , 'please add a name']
    },
    email: {
        type: String,
        required: [true , 'please add an Email'],
        unique:true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "please add a valid email",
        ]
      },
      role:{
        type:String,
        enum: ['user','publisher'],
        default: 'user'
      },
      password:{
        type:String,
        required:[true, 'please add a password '],
        minlength: 6,
        select: false
      },
      resetPasswordToken: String,
      resetPasswordExpire:Date,
      createdAt:{
        type:Date,
        default: Date.now
      }

});

// Encrypt password using Bcrypt

UserSchema.pre('save', async function(next){
  const salt =await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
 
}); 
// sign jwt and return
UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};



// match user entered password to hashed password in database
UserSchema.methods.matchPassword=async function(enteredpassword){
   return await bcrypt.compare(enteredpassword, this.password);
};

export default mongoose.model('User', UserSchema); 