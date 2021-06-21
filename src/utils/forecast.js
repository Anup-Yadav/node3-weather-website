const rqst = require('postman-request')

const forcst = (latti,longi,callback) => {
    const urll =  'http://api.weatherstack.com/current?access_key=433b3f2496713c93874b813b61937687&query= ' + latti + ',' + longi + '&units=m'


    rqst({url:urll , json:true },(error,respns) => {
        if(error){
            callback("Unable to fetch data from web services , Check Wi-Fi !",undefined)
        }else if(respns.body.error ){
            callback("There is error in the cordinates , try another pair !",undefined)
        }else{
            callback(undefined,"Your latitude : " + latti + " and your longitude: "+ longi+" .............................................. You have wind speed :"+ respns.body.current.wind_speed + " Km/h "+respns.body.current.wind_degree+ " "+respns.body.current.wind_dir + ". It's "+respns.body.current.humidity + " % Humidity around with "+ respns.body.current.cloudcover + " % Cloudcover."+"It is currently " + respns.body.current.temperature + " degrees out" + " but , It feels like " + respns.body.current.feelslike + " degrees")
        }
    })

}


module.exports = forcst