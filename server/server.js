import  express  from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter  from './routes/useRouter.js'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import dbConnect from "./config/db.js";
import cookieParser from "cookie-parser";
import adminRouter from './routes/adminRouter.js'



dotenv.config();
const port =process.env.PORT || 5000 
dbConnect()
const app=express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.static('server/public/'))
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)

//error handler
app.use(notFound);
app.use(errorHandler)





app.listen(port,()=>console.log(`server is runnig at port ${port}`))