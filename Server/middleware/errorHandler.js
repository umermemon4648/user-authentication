 const errorHandler = (
    res,
    statusCode=500, 
    message="Internal Server Error"
    )=>{
    return res.status(statusCode).json({
        success: false,
        message,
    })
}

const catchAsyncError = (handler) => (req, res)=>{
    Promise.resolve(handler(req, res)).catch((error)=>{
        return errorHandler(res)
    })}

    
module.exports = {catchAsyncError, errorHandler}