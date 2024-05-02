import asyncHandler  from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/genarteToken.js'



const  authUser=asyncHandler(async(req,res)=>{
    
       res.status(200).json('hello ')
})


const createUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    

    const userExist=await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exist')
    }
    const user= new User({
        name,
        email,
        password
    })

  


   const userData= await user.save()
   generateToken(res,userData._id)
    res.status(200).json(userData)

})


const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const user=await User.findOne({email})



    if (!user) {
        res.status(400)
        throw new Error('Invalid User')
      }
  
      const isPasswordMatch = await user.isPasswordMatch(password);

      if(isPasswordMatch){
        generateToken(res,user._id)
        res.status(200).json(user)
      }else{
        res.status(400)
        throw new Error('Password is incorrect')
      }
  
   
})


const updateUser = asyncHandler(async (req, res) => {
    console.log('hello');
const id=req.user._id
    const user = await User.findById(id);
const body=req.body
    if (!user) {
        res.status(400)
        throw new Error('Invalid Id')
    }

    user.name = body.name || req.user.name;
    user.email = body.email || req.user.email;
     if(body.password){
        user.password=body.password
     }

    
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
});





const logoutUser=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    })

res.status(200).json('User is logged OUT')


})




const getUser=asyncHandler(async(req,res)=>{
  
  
 const user=req.user
res.status(200).json(user)

   
})

const updateProfile=asyncHandler(async(req,res)=>{
   
    const file=req.file.filename
    console.log(file,'this is file'); 
    const id=req.user._id
    const user = await User.findById(id);
console.log('this is user',user);
    if(!user){
        throw new Error('user is not valid')
    }
    user.profile=file
    const updateUser=await user.save()

res.status(200).json(updateUser)


    console.log('file',file);
})


export {
    authUser,
    createUser,
    loginUser,
    updateUser,
    logoutUser,
    getUser,
    updateProfile
}