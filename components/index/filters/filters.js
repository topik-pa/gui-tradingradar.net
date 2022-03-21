import api from '../../../scripts/api.js'
const $root = document.getElementById('filters')
const cls = ['idle', 'loading', 'success', 'error']

const apiCallList = [
  {
    name: 'rating',
    key: 'borsaIt_rating',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    name: 'mfRanking',
    key: 'milFin_mfRanking',
    qp: 'order=asc',
    stocks: undefined,
    status: 'idle'
  },
  {
    name: 'mediumTendency',
    key: 'sol24_mediumTendency',
    qp: 'order=asc',
    stocks: undefined,
    status: 'idle'
  },
  {
    name: 'rsi',
    key: 'borsaIt_rsi',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  }
]

const addedFilters = {
  ratings: {
    key1: 'borsaIt_rating',
    key2: 'milFin_mfRanking',
    class: 'ranking',
    status: 'idle',
    stocks: []
  },
  judgments: {
    key1: 'lastJudgment',
    key2: 'sol24_mediumTendency',
    class: 'judgment',
    status: 'idle',
    stocks: []
  },
  overbought: {
    key1: 'borsaIt_rsi',
    key2: 'milFin_rsi',
    class: 'overbought',
    status: 'idle',
    stocks: []
  },
  oversold: {
    key1: 'borsaIt_rsi',
    key2: 'milFin_rsi',
    class: 'oversold',
    status: 'idle',
    stocks: []
  }
}

async function callTheApi () {
  for (const apiCall of apiCallList) {
    apiCall.status = 'loading'
    try {
      const request = await api.get(`api/stocks/${apiCall.name}/?${apiCall.qp}`)
      apiCall.stocks = request.body
      apiCall.status = 'success'
    } catch (error) {
      apiCall.status = 'error'
      console.error(error)
    }
  }
  return apiCallList
}

function printApiFiltersInPage (filter) {
  const $wrap = $root.getElementsByClassName(filter.class)[0]
  $wrap.classList.remove(...cls)
  $wrap.classList.add(filter.status)
  if (filter.stocks.length) {
    const $ul = $wrap.getElementsByTagName('ul')[0]
    for (const stock of filter.stocks) {
      const $li = document.createElement('li')
      const $a = document.createElement('a')
      $a.innerText = stock.name
      $a.title = stock.name
      $a.href = `/analisi/${encodeURI(stock.name.toLowerCase())}?isin=${stock.isin}`
      const $span1 = document.createElement('span')
      $span1.innerText = stock[filter.key1].value
      const $span2 = document.createElement('span')
      $span2.innerText = stock[filter.key2].value
      $li.appendChild($a)
      $li.appendChild($span1)
      $li.appendChild($span2)
      $ul.appendChild($li)
    }
    $wrap.appendChild($ul)
  }
}

const filters = {
  init: async (apiListWStocks) => {
    addedFilters.ratings.status = 'loading'
    addedFilters.judgments.status = 'loading'
    addedFilters.overbought.status = 'loading'
    addedFilters.oversold.status = 'loading'
    printApiFiltersInPage(addedFilters.ratings)
    printApiFiltersInPage(addedFilters.judgments)
    printApiFiltersInPage(addedFilters.overbought)
    printApiFiltersInPage(addedFilters.oversold)

    await callTheApi()

    addedFilters.ratings.status = 'success'
    addedFilters.judgments.status = 'success'
    addedFilters.overbought.status = 'success'
    addedFilters.oversold.status = 'success'

    apiListWStocks = apiListWStocks.concat(apiCallList)

    const BIRatings = apiListWStocks.filter((api) => {
      return api.name === 'rating'
    })
    const MFRatings = apiListWStocks.filter((api) => {
      return api.name === 'mfRanking'
    })
    const lastJudgment = apiListWStocks.filter((api) => {
      return api.name === 'lastJudgment'
    })
    const medTendency = apiListWStocks.filter((api) => {
      return api.name === 'mediumTendency'
    })
    const biRSI = apiListWStocks.filter((api) => {
      return api.name === 'rsi'
    })
    const mfRSI = apiListWStocks.filter((api) => {
      return api.name === 'mfRsi'
    })

    for (const stockA of BIRatings[0].stocks) {
      if (stockA[BIRatings[0].key].value === 3 || stockA[BIRatings[0].key].value === 4) {
        for (const stockB of MFRatings[0].stocks) {
          if (stockB.isin === stockA.isin && (stockB[MFRatings[0].key].value.includes('A') || stockB[MFRatings[0].key].value.includes('B'))) {
            stockA[MFRatings[0].key] = stockB[MFRatings[0].key]
            addedFilters.ratings.stocks.push(stockA)
          }
        }
      }
    }

    for (const stockA of lastJudgment[0].stocks) {
      if (stockA[lastJudgment[0].key].value.includes('Buy')) {
        for (const stockB of medTendency[0].stocks) {
          if (stockB.isin === stockA.isin && (stockB[medTendency[0].key].value.includes('Rialzo'))) {
            stockA[medTendency[0].key] = stockB[medTendency[0].key]
            addedFilters.judgments.stocks.push(stockA)
          }
        }
      }
    }

    console.log(biRSI)
    console.log(mfRSI)

    for (const stockA of biRSI[0].stocks) {
      if (stockA[biRSI[0].key].value > 20) {
        for (const stockB of mfRSI[0].stocks) {
          if (stockB.isin === stockA.isin && (stockB[mfRSI[0].key].value > 45)) {
            stockA[mfRSI[0].key] = stockB[mfRSI[0].key]
            addedFilters.overbought.stocks.push(stockA)
          }
        }
      }
    }

    for (const stockA of biRSI[0].stocks) {
      if (stockA[biRSI[0].key].value < -20) {
        for (const stockB of mfRSI[0].stocks) {
          if (stockB.isin === stockA.isin && (stockB[mfRSI[0].key].value < 45)) {
            stockA[mfRSI[0].key] = stockB[mfRSI[0].key]
            addedFilters.oversold.stocks.push(stockA)
          }
        }
      }
    }

    printApiFiltersInPage(addedFilters.ratings)
    printApiFiltersInPage(addedFilters.judgments)
    printApiFiltersInPage(addedFilters.overbought)
    printApiFiltersInPage(addedFilters.oversold)
  }
}

export default filters
