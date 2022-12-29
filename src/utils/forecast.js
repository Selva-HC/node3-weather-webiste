const request = require('request')

const forecast = (latitude,  longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=61522d2de87c5dc173e2b19478551911&query=' + latitude + ',' + longitude + '&units=f'

        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
            }
        })
}

module.exports = forecast