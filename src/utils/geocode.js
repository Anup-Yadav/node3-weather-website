const rqst = require('postman-request')

const geocd = (address,callback) => {
    const urll = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW51cHlhZGF2MSIsImEiOiJja3B6dTl0YWwwdGZ3MnRxY3l3bXlobXI0In0.zcSb8YCNmlZEDVOnIl3MZg&limit=1'

    rqst({url:urll , json:true },(error,repons) => {
        if(error){
            callback("Unable to fetch data from web services , Check Wi-Fi !",undefined)
        }else if(repons.body.features.length === 0){
            callback("There is error in the address , try another one !",undefined)
        }else{
            callback(undefined,{ 
                latitude :  repons.body.features[0].center[1] ,
                longitude :  repons.body.features[0].center[0] ,
                location :   repons.body.features[0].place_name 
            })
        }
    })

}

// geocd('jaipur',(errr,dataa)=>{
//     console.log('error : '+errr)
//     console.log('dataa : '+dataa)
// })


module.exports = geocd