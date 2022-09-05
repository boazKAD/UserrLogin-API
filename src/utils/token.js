import  bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";

class TokenHelper{

    static async generateToken(data){
        return jwt.sign({data: data}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
          });  
    }

    static async verifyToken(token){
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        return decodedToken;
    }
}




export default TokenHelper