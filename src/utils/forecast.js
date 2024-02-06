const request = require("request");
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fd8aeb0167ad6b2f1169c536ed35535c&query='+latitude+','+longitude
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {

            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. Feels like ' + body.current.feelslike + ' degrees out.' + ' the humidity is ' +  body.current.humidity + ' %')

        }
    })
}


module.exports = forecast