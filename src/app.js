const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


console.log(__dirname);
console.log(path.join(__dirname,'../public'));
const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and view location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));



app.get('', (req,res) =>{
    res.render('index',{
        title:'Weather App',
        name: 'Andrew',
        name: 'Pral'
    });
});

app.get('/about', (req,res) =>{
    res.render('about',{
        title:'About',
        name: 'Pral'
    });
});

app.get('/help', (req,res) =>{
    res.render('help',{
        title:'Help',
        helpText: 'Please email for any inquiries to',
        email: 'pralhlad.arumugam@gmail.com',
        name: 'Pral'
    });
});

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({error:'You must provide an address'});
    }
    geocode(req.query.address, (err,{lat,long,location}={}) => {
        if(err){
            return res.send({error:err});
        } 
      
        forecast(lat, long, (error, forecastData) => {
            if(error){
                return res.send({error:error});
            }
             res.send({
                 forecast: forecastData,
                 address:req.query.address,
                 location
             })
          })
    })

});

app.get('/products',(req,res) =>{

    if(!req.query.search){
        return res.send({
            errorMsg: 'You must provide a search term'
        })
    }
    console.log(req.query);

    res.send({
        products:[]
    });

});

app.get('/help/*', (req,res) =>{
    res.render('error404',{
        errMsg: 'Help article not found',
        title:'404',
        name:'Pral'
    });

});

app.get('*', (req,res) =>{
    res.render('error404',{
        errMsg: 'Page not found',
        title:'404',
        name:'Pral'
    })

});



app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
