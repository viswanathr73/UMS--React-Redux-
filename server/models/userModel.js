import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,

    },
    isAdmin:{
      type:Number,
      default:0
    }
}, {
    timestamps: true  
  })


userSchema.pre('save', async function (next) {
    const user = this;
  
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  });
  
  // Create a method to compare passwords
  userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    try {
      return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
      throw error;
    }
  };
  

const User= mongoose.model("User",userSchema)


export default User