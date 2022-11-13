const { AssertionError } = require('assert');
c
const { registerPartial } = require('hbs');
const app = express()
const https=require('https');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/api',(req,res)=>{
  
   res.render("wether",{te : "23.44° C", do :"overcast clouds" ,pr:"95%", pla: "guj", img: "huhu"});
})


app.post("/api",(req,res)=>{
   const city=req.body.city;
   console.log(city);
   const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=239bebb93350ab12ac5dbc9fec2dc773";
   
   https.get(url,(respo)=>{
   
    
    
      
      respo.on("data", (data) =>{
         const weatherData = JSON.parse(data)
       
         console.log(weatherData)
         if(weatherData.cod==='404'){
            console.log('hello');
            res.render("wether",{er:"error"});
            
         }
         else
         {
            const temp = weatherData.main.temp
            const hum=weatherData.main.humidity
            
            const temperature1 = temp + "° C"
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            console.log(temp);
            console.log({temp1 : temperature1, des :weatherDesc ,press: hum, place: city, img: imgurl})
            res.render("wether",{temp1 : temperature1, des :weatherDesc ,press: hum, place: city, img: imgurl});
           
         }
       
       
        
       
     });
 
   }).on('error',(e)=>{
   console.log("error");
   })

})



app.listen(4000,()=>{
   console.log("start server");
})