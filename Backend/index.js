const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app=express();
require('dotenv').config();
const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGODBURI);
app.use(cors());
app.use(express.json());
const WeatherData=mongoose.model('WeatherData', {
  city: String,
  country: String,
  temperature: Number,
  description: String,
  icon: String,
});
app.post('/api/weather',async(req,res)=>{
    try{
        const {city,country,temperature,description,icon}=req.body;
        const weatherData=new WeatherData({
            city,
            country,
            temperature,
            description,
            icon,
        });
        await weatherData.save();
        res.json({ message:'Weather data saved successfully'});
    }catch(error){
        console.error('Error saving weather data:',error);
        res.status(500).json({error:'Internal Server Error'});
    }
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});