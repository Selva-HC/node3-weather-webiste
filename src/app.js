const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require ('./utils/geocode.js') 
const forecast= require ('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
            helptext: 'Welcome to the Landing page',
            title: 'weather app',
            name: 'Selva'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
            helptext: 'Welcome to the about page',   
            title: 'About app',
            name: 'Selva'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
            helptext: 'This is some helpful text.',
            title: 'Help app',
            name: 'Selva'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must enter address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
    // console.log(req.query.address)
    // res.send({
    //     address:req.query.address,
    //     location:'San Antonio'
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//Redirect to 404 page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Selva',
        errorMessage: 'Help Page not found'
    })
})
app.get('*', (req, res) => {
        res.render('404', {
            title: '404',
            name: 'Selva',
            errorMessage: 'Page not found'
        })
})

app.listen(3000, () => {
        console.log('Server is up on port 3000.')
})