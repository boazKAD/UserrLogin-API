// import jwt from "jsonwebtoken";
// import ErrorResponse from "../src/utelis/errorResponse";
// import User from "../src/modles/users";

// // protect route
// exports.protect = async  (req, res, next)=>{
//     let token;

//     if(
//         req.headers.authorization && req.headers.authorization.startsWith('Bearer')
//     ) {
//         token = req.headers.authorization.split(' ')[1]; 

//     }
//     // else if(req.cookies.token){
//     //   token= req.cookies.token  
//     // }

//     // make sure token exists
//     if(!token){
//       return next(new ErrorResponse('not authorize to access this route', 401));
//     }
//     try {
//         // verify token 
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log(decoded);
//         req.user= await User.findById(decoded.id);
//         next();
//     } catch (err) {
//         return next(new ErrorResponse('not authorize to access this route', 401));
//     }
// };