import TokenHelper from '../utils/token'
import User from '../modles/users';
import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../../middleWare/async';

class UserController{
    static register= asyncHandler(async(req, res, next)=>{

            const { name, email, password, role} = req.body;

            const user = await User.create({
                name,
                email,
                password,
                role
            });
            const token= user.getSignedJwtToken(); 
            res.status(200). json({
                success: true,
                data: token
            });
    });

    static async login(req, res, next){

        const { email, password } = req.body;

         // validate email & password
         if(!email || !password){
            return next(new ErrorResponse('please provide an email and password', 400));
        }
        // check  fro user
        const user =await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorResponse('invalid credentials', 401));
    
    }
    // check if password matches
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return next(new ErrorResponse('invalid credentials', 401));
    }
     const token=await TokenHelper.generateToken(user); 
        res.status(200). json({
            success: true,
            data: user,
            token:token
        });
    };

    // get all users
    static getMe = asyncHandler(async (req, res, next) =>{
    
        const user = await User.find();
        res.status(200).json ({success: true ,count:user.length, data : user})
   
});


   
// @desc         get current logged in user
// @route        GET /api/v1/me
// @access       private
static  getMe = asyncHandler (async (req, res, next) => {
   const user = await User.findById(req.params.id);

   res.status(200). json({
       success: true,
       data: user
   });
});
 
// @desc         delete user
// @route        DELETE /api/v1/delete/:id
// @access       privet

static deleteUser =asyncHandler(async (req, res, next) =>{

    // console.log(req.headers.authorization)
    const token= req.headers.authorization;
    if (token==null || token == undefined) {
        res.status(400).json ({ success:false , error: "Please login first" });
    }
    const verifiedUser = await TokenHelper.verifyToken(token)  

    let users = await User.findById(req.params.id);
    
    if(users.email !== verifiedUser.data.email){
        res.status(401).json ({ success:false , error: "You can not delete another user" });
  
    }

    let deletedUser = await User.findByIdAndDelete(req.params.id);
 

    res.status(200).json ({ success:true , message: "Account deleted succesfully" });


});

// @desc         Update  user 
// @route        PUT /api/v1/update/:id
// @access       privet

static updateUser = asyncHandler(async (req, res, next) =>{

    const token= req.headers.authorization;
    if (token==null || token == undefined) {
        res.status(400).json ({ success:false , error: "Please login first" });
    }
    const verifiedUser = await TokenHelper.verifyToken(token)
    
    if(email==undefined  ){

    }

    let users = await User.findById(req.params.id);
console.log(verifiedUser)
    if(users.email !== verifiedUser.data.email){
        res.status(401).json ({ success:false , error: "You can not update another user" });
  
    }

  
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators:true
    });
   
    res.status(200).json ({ success:true ,message: 'account updated succesfully', data: user});


}); 

}

export default UserController; 