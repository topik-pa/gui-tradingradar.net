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

function hasIsin (req, res, next) {
  if (req.query.isin) return next()
  res.render('404/404', { id: 'err404', title: 'Error 404' })
}

function getStockNameFromIsin (isin) {
  if (!stocks.length) return
  for (const stock of stocks) {
    if (stock.isin === isin) {
      return stock.name
    }
  }
}

module.exports = app => {
  app.get('/', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/privacy', (req, res) => {
    const breadcrumbs = [
      {
        name: 'privacy'
      }
    ]
    res.render('privacy/privacy', { id: 'privacy', title: 'Privacy', url: req.url, breadcrumbs })
  })
  app.get('/contatti', (req, res) => {
    const breadcrumbs = [
      {
        name: 'contacts'
      }
    ]
    res.render('contatti/contatti', { id: 'contacts', title: 'Contacts', url: req.url, breadcrumbs })
  })
  app.get('/analisi/:stock', hasIsin, (req, res) => {
    const stock = {
      isin: req.query.isin,
      name: capitalize(req.params.stock),
      encodedName: req.params.stock
    }
    const breadcrumbs = [
      {
        name: 'analysis',
        url: '/#select_stock'
      },
      {
        name: req.params.stock
      }
    ]
    res.render('analisi/analisi', { id: 'analysis', title: 'Analysis', url: req.url, stock, breadcrumbs })
  })
  /* REDIRECTS */
  app.get('/en', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/it', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/fr', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/en/analyses', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/it/analyses', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/fr/analyses', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/market/', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/market/:param', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/market/en/:param', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/market/it/:param', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/market/fr/:param', (req, res) => {
    res.locals.stocks = stocks
    res.render('index', { id: 'home', title: 'Home', url: req.url })
  })
  app.get('/stock/:param', (req, res) => {
    let stock, breadcrumbs
    if (req.query.isin) {
      stock = {
        isin: req.query.isin,
        name: capitalize(req.params.param),
        encodedName: req.params.param
      }
      breadcrumbs = [
        {
          name: 'analysis',
          url: '/#select_stock'
        },
        {
          name: req.params.param
        }
      ]
    } else {
      const name = getStockNameFromIsin(req.params.param)
      if (!name) {
        res.locals.stocks = stocks
        res.render('index', { id: 'home', title: 'Home', url: req.url })
        return
      }
      stock = {
        isin: req.params.param,
        name: name,
        encodedName: encodeURI(name.toLowerCase())
      }
      breadcrumbs = [
        {
          name: 'analysis',
          url: '/#select_stock'
        },
        {
          name: name
        }
      ]
    }
    res.render('analisi/analisi', { id: 'analysis', title: 'Analysis', url: req.url, stock, breadcrumbs })
  })
  app.get('*', function (req, res) {
    res.locals.stocks = stocks
    res.render('404/404', { id: 'err404', title: 'Error 404' })
  })
}
