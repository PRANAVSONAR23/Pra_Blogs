const express=require('express')
const path =require('path')
const mongoose=require('mongoose')

const userRoute= require('./routes/user')

const app=express()
const port=8000

mongoose.connect('mongodb+srv://pranavsonar2311:YDWetrxzL6C5vLqu@cluster0.wuaph.mongodb.net/blogify').then(e=>console.log('MongoDB Connected'))

app.set('view engine','ejs');
app.set('views', path.resolve("./views"));

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('home')
})

app.use('/user', userRoute)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

