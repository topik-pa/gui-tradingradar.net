import api from '../../../scripts/api.js'
const $root = document.getElementById('api_list')
const cls = ['idle', 'loading', 'success', 'error']

const apiCallList = [
  {
    id: 0,
    category: 'first',
    name: 'perf1M',
    key: 'perf1M',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    id: 1,
    category: 'first',
    name: 'perf6M',
    key: 'perf6M',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    id: 2,
    category: 'first',
    name: 'perf1Y',
    key: 'perf1Y',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    id: 3,
    category: 'second',
    name: 'volatility',
    key: 'volatility',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    id: 4,
    category: 'second',
    name: 'mfRsi',
    key: 'milFin_rsi',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    id: 5,
    category: 'second',
    name: 'shortTendency',
    key: 'sol24_shortTendency',
    qp: 'order=asc',
    stocks: undefined,
    status: 'idle'
  },
  {
    id: 6,
    category: 'third',
    name: 'divYield',
    key: 'divYield',
    qp: 'order=desc',
    stocks: undefined,
    status: 'idle'
  },
  {
    id: 7,
    category: 'third',
    name: 'lastJudgment',
    key: 'lastJudgment',
    qp: '',
    stocks: undefined,
    status: 'idle'
  }
]

async function callTheApi () {
  for (const apiCall of apiCallList) {
    apiCall.status = 'loading'
    printApiStocksInPage(apiCall)
    try {
      const request = await api.get(`api/stocks/${apiCall.name}/?${apiCall.qp}`)
      apiCall.stocks = request.body
      apiCall.status = 'success'
    } catch (error) {
      apiCall.status = 'error'
      console.error(error)
    }
    printApiStocksInPage(apiCall)
  }
  return apiCallList
}

function printApiStocksInPage (api) {
  const $wrap = $root.getElementsByClassName(api.name)[0]
  $wrap.classList.remove(...cls)
  $wrap.classList.add(api.status)
  if (api.stocks) {
    const $ul = $wrap.getElementsByTagName('ul')[0]
    for (const a of api.stocks) {
      const $li = document.createElement('li')
      const $a = document.createElement('a')
      $a.innerText = a.name
      $a.title = a.name
      $a.href = `/analisi/${encodeURI(a.name.toLowerCase())}?isin=${a.isin}`
      const $span = document.createElement('span')
      $span.innerText = a[api.key].value
      $li.appendChild($a)
      $li.appendChild($span)
      $ul.appendChild($li)
    }
    $wrap.appendChild($ul)
  }
}

const apiList = {
  init: () => {
    return callTheApi()
  }
}

export default apiList
