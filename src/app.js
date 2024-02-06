const express = require('express')
const app = express()

const path = require('path')
const hbs = require('hbs')
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Michael Baccin'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Michael Baccin'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'thi is some helpful text',
        name: 'Michael Baccin'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})


app.get('/help/*', (req, res) => {
    res.send('HELP ARTICLE NOT FOUND!')
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404!',
        name: 'Michael Baccin',
        erroreMessage: 'Error 404 you are lost in the page!'
    })
})


app.listen( port, () => {
    console.log('Server is up on port ' + port)
})