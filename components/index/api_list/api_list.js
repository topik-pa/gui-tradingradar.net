import api from '../../../scripts/api.js'
let $root, cls

async function callTheApi (apis) {
  const proms = []
  for (const apiCall of apis) {
    if (apiCall.category !== 'api') {
      continue
    }
    if (apiCall.status !== 'idle') {
      printApiStocksInPage(apiCall)
      continue
    }
    apiCall.status = 'loading'
    updateUIStatus(apiCall)

    proms.push(
      new Promise((resolve, reject) => {
        const res = api.get(`api/stocks/${apiCall.name}/?${apiCall.qp}`)
        resolve(res)
      })
        .then((data) => {
          apiCall.stocks = data.body
          apiCall.status = 'success'
          printApiStocksInPage(apiCall)
        })
        .catch((error) => {
          apiCall.status = 'error'
          console.error(error)
        })
        .finally(() => {
          updateUIStatus(apiCall)
        })
    )
  }
  await Promise.all(proms)
}

function updateUIStatus (apiCall) {
  const $wrap = $root.getElementsByClassName(apiCall.name)[0]
  $wrap.classList.remove(...cls)
  $wrap.classList.add(apiCall.status)
}

function printApiStocksInPage (apiCall) {
  if (apiCall.stocks) {
    const $wrap = $root.getElementsByClassName(apiCall.name)[0]
    const $ul = $wrap.getElementsByTagName('ul')[0]
    for (const a of apiCall.stocks) {
      const $li = document.createElement('li')
      const $a = document.createElement('a')
      $a.innerText = a.name
      $a.title = a.name
      $a.href = `/analisi/${encodeURI(a.name?.toLowerCase().replace(/ /g, '-'))}?isin=${a.isin}`
      const $span = document.createElement('span')
      $span.innerText = Array.isArray(a[apiCall.key].value) ? a[apiCall.key].value.join(' - ') : a[apiCall.key].value
      $li.appendChild($a)
      $li.appendChild($span)
      $ul.appendChild($li)
    }
    $wrap.appendChild($ul)
  }
}

const apiList = {
  init: async (apis) => {
    $root = document.getElementById('api_list')
    cls = ['idle', 'loading', 'success', 'error']

    await callTheApi(apis)
  }
}

export default apiList
