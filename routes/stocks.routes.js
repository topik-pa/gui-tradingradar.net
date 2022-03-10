module.exports = app => {
  const stocks = require('../controllers/stocks.controller.js')
  const router = require('express').Router()

  // GET stocks list
  router.get('/', stocks.getStocksList)

  app.use('/api/stocks', router)
}
