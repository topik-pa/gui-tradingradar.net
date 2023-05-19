import api from '../../../scripts/api.js'
import hpAlerts from '../components/index/hp-alerts/hp-alerts.js'
import inTrendStocks from '../components/index/inTrendStocks/inTrendStocks.js'
import stocksList from '../components/index/stocks_list/stocks_list.js'
import apiList from '../components/index/api_list/api_list.js'
import aggregator from '../components/index/aggregator/aggregator.js'

const apis = JSON.parse(sessionStorage.getItem('localapi')) || [
  {
    category: 'api',
    name: 'perf1M',
    key: 'perf1M',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    category: 'api',
    name: 'perf6M',
    key: 'perf6M',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    category: 'api',
    name: 'perf1Y',
    key: 'perf1Y',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    category: 'api',
    name: 'volatility',
    key: 'volatility',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    category: 'api',
    name: 'shortTendency',
    key: 'sol24_shortTendency',
    qp: 'order=asc',
    stocks: undefined,
    status: 'idle'
  },
  {
    category: 'api',
    name: 'divYield',
    key: 'divYield',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    category: 'api',
    name: 'lastJudgment',
    key: 'lastJudgment',
    qp: '',
    stocks: undefined,
    status: 'idle'
  },
  {
    category: 'filters',
    name: 'rating',
    key: 'borsaIt_rating',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    category: 'filters',
    name: 'mfRanking',
    key: 'milFin_mfRanking',
    qp: 'order=asc',
    stocks: undefined,
    status: 'idle'
  },
  {
    category: 'filters',
    name: 'mediumTendency',
    key: 'sol24_mediumTendency',
    qp: 'order=asc',
    stocks: undefined,
    status: 'idle'
  },
  {
    category: 'filters',
    name: 'rsi',
    key: 'borsaIt_rsi',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  }
]

async function callCustomRoute () {
  const $inTrendStocks = document.getElementById('in-trend-stocks')
  const $hpAlerts = document.getElementById('hp-alerts')
  $inTrendStocks.classList.add('loading')
  $hpAlerts.classList.add('loading')
  try {
    const request = await api.get('api/custom')
    hpAlerts.init(request.body, $hpAlerts)
    inTrendStocks.init(request.body, $inTrendStocks)
  } catch (error) {
    $inTrendStocks.classList.add('error')
    $hpAlerts.classList.add('error')
    console.error(error)
  } finally {
    $inTrendStocks.classList.remove('loading')
    $hpAlerts.classList.remove('loading')
  }
}

const index = {
  init: async () => {
    stocksList.init()
    await callCustomRoute()
    await apiList.init(apis)
    aggregator.init(apis)
    sessionStorage.setItem('localapi', JSON.stringify(apis))
  }
}

export default index
