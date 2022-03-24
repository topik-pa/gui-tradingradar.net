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

function capitalize (text) {
  const words = text.split(' ')
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1)
  }
  return words.join(' ')
}

module.exports = app => {
  app.get('/', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home' })
  })
  app.get('/privacy', (req, res) => {
    const breadcrumbs = [
      {
        name: 'privacy',
        url: '/privacy'
      }
    ]
    res.render('privacy/privacy', { id: 'privacy', title: 'Privacy', breadcrumbs })
  })
  app.get('/contatti', (req, res) => {
    const breadcrumbs = [
      {
        name: 'contacts',
        url: '/contatti'
      }
    ]
    res.render('contatti/contatti', { id: 'contacts', title: 'Contacts', breadcrumbs })
  })
  app.get('/analisi/:stock', (req, res) => {
    const stock = {
      isin: req.query.isin,
      name: capitalize(req.params.stock)
    }
    const breadcrumbs = [
      {
        name: 'analysis'
      },
      {
        name: req.params.stock,
        url: `/analisi/${encodeURI(req.params.stock.toLowerCase())}?isin=${stock.isin}`
      }
    ]
    res.render('analisi/analisi', { id: 'analysis', title: 'Analysis', stock, breadcrumbs })
  })
}
