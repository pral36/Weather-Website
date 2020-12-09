//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request");

const forecast = (latitude, longitude , callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e8b8cb3396138b6ad0c90887e2e66fe1&query=${latitude},${longitude}&units=f`;
    console.log(url);

    request({url, json:true},(err,{body}={}) => {
        if(err){
            callback('Unable to connect to weather service!');
        }
        else if(body.error){
            callback('Unable to find location!');
        }else{
            const weatherDesc = body.current.weather_descriptions[0];
            const temp = body.current.temperature;
            const feelsLike = body.current.feelslike;
            const humidityRate = body.current.humidity;
            callback(err,`${weatherDesc}. It is currently ${temp} degF and feels like ${feelsLike} degF and humidity is ${humidityRate}%.`);
        }
    })

}

module.exports=forecast;


