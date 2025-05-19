const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv');
const authRoutes=require('./routes/auth')
const app=express()

dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.mongouri)
.then(()=>console.log("mongo db is successfully connected"))
.catch(err=>console.error("mongo db has problem:",err))

app.get('/test', (req, res) => {
    res.send('Server is working!');
  });
  

app.use('/api/auth',authRoutes)

const port=5000;
app.listen(port,()=>{
    console.log(`the port runs on the server ${port}`)
})

