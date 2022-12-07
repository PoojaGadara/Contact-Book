const userModel = require('../models/userModel.js')
const Errorhandler = require('../utills/errorHandler')
const catchAsyceError = require('../middleware/catchAsyncError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//create User
exports.createUser = catchAsyceError(async (req,res,next) => {
try{
    const {username,email,password} = req.body
    
    const isUser = await userModel.findOne({email});

    //check for existing user
    if(isUser){
        return next(new Errorhandler("User is Already Exist !! please Login" , 404))
    }

    //encrypted Password 
    const encryptedPassword = await bcrypt.hash(password, 10);

    //create User 
        const user = await userModel.create({
            username,
            email : email.toLowerCase(),
            password : encryptedPassword,
        });

    //create token
    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      //save user token 
      user.token = token;

      //sucess user responce
        res.status(201).json({
            success:true,
            user
        })
        
}catch(err){
    console.log(err)
}
});

//Login User 
exports.loginUser = catchAsyceError(async (req,res,next) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user existance 
        const user = await userModel.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          //  //sucess user responce
          res.status(201).json({
            success:true,
            user
        })
        }

        //return error if Password and Email Address is not same
        return next(new Errorhandler("Please Enter Currect UserName and Password" , 404)) 

      } catch (err) {
        console.log(err);
      }
});
    
exports.welcomeUser = catchAsyceError(async (req,res) => {
    res.status(201).json({
        messsage : "welcome"
    })
})