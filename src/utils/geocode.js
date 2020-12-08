const request = require('request');

const geocode = (add,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(add)}.json?access_token=pk.eyJ1IjoicHJhbDM2IiwiYSI6ImNraThvZ2J6YjAwdXQycG1naGZlbms0MTUifQ.5q5t7FCyxcFE6cVOPPV43w&limit=1`
    request({url ,json:true},(error, {body}={}) => {
        if(error){
            callback('Unable to connect to location services');
        } else if (body.features.length==0){
            callback('Location could not be found');
        }else{
            const lat = body.features[0].center[1];
            const long = body.features[0].center[0];
            const location = body.features[0].place_name;
            callback(error,{
                lat,
                long,
                location
            });
        }

    })
}

module.exports=geocode

