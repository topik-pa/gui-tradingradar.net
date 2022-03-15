const { query } = require('express')
const https = require('https')
let stocks = []

function getStocksList () {
  const options = {
    method: 'GET',
    hostname: 'tradingradar.p.rapidapi.com',
    port: null,
    path: '/api/stocks',
    headers: {
      'x-rapidapi-host': 'tradingradar.p.rapidapi.com',
      'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
      useQueryString: true
    }
  }
  const request = https.request(options, function (response) {
    const chunks = []
    response.on('data', function (chunk) {
      chunks.push(chunk)
    })
    response.on('end', function () {
      const body = Buffer.concat(chunks).toString()
      try {
        stocks = JSON.parse(body)
      } catch (error) {
        console.err(error)
      }
    })
  })
  request.end()
  request.on('error', error => {
    console.err(error)
  })
}
getStocksList()

module.exports = app => {
  app.get('/', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home' })
  })
  app.get('/privacy', (req, res) => {
    res.render('privacy/privacy', { id: 'privacy', title: 'Privacy' })
  })
  app.get('/contatti', (req, res) => {
    res.render('contatti/contatti', { id: 'contacts', title: 'Contatti' })
  })
  app.get('/analisi/:stock', (req, res) => {
    res.render('analisi/analisi', { id: 'analisi', title: 'Analisi', isin: req.query.isin })
  })
}
