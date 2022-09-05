import ErrorResponse from "../src/utils/errorResponse";

const errorHandler = (err, req, res, next)=> {

    let error = {...err}

    error.message = err.message;
    // Log to console for dev 
    console.log(err );

//    Mongoose bad ObjectId
if(err.name === 'CastError'){ 

    const message =`User not found with id of ${err.value}`;
    error = new ErrorResponse(message , 404);
};

// mongoose duplicate key 
if(err.code === 11000){
    const message= 'duplicate field value entered';
    error= new ErrorResponse(message, 400);
}
// mongoose validetion error 
if(err.name === 'ValidationError'){
    const message= Object.values(err.errors).map(val => val.message);
    error= new ErrorResponse(message, 400)

}

    res.status(error.statusCode  || 500).json({
        success: false,
        error:error.message  || 'Server Error'
    }); 

}

export default errorHandler ;