async function print (data, $root) {
  const uptrendStocks = data.uptrends
  const downtrendStocks = data.downtrends
  // if (uptrendStocks === 0) return
  const $uptrendTable = $root.querySelector('#uptrend')
  const $uptrendTbody = $uptrendTable.querySelector('tbody')
  const $downtrendTable = $root.querySelector('#downtrend')
  const $downtrendTbody = $downtrendTable.querySelector('tbody')
  for (const stock of uptrendStocks) {
    const $tr = document.createElement('tr')

    const $td1 = document.createElement('td')
    const $a = document.createElement('a')
    $a.innerText = stock.name
    $a.title = stock.name
    $a.href = `/analisi/${encodeURI(stock.name?.toLowerCase().replace(/ /g, '-'))}?isin=${stock.isin}`
    $td1.appendChild($a)

    const $td2 = document.createElement('td')
    $td2.classList.add('green')
    $td2.innerText = stock.lastPrice?.value

    const $td3 = document.createElement('td')
    $td3.innerText = stock.mm20days?.value

    const $td4 = document.createElement('td')
    $td4.innerText = stock.mm40days?.value

    const $td5 = document.createElement('td')
    $td5.innerText = stock.mm100days?.value

    $tr.appendChild($td1)
    $tr.appendChild($td2)
    $tr.appendChild($td3)
    $tr.appendChild($td4)
    $tr.appendChild($td5)

    $uptrendTbody.appendChild($tr)
  }

  for (const stock of downtrendStocks) {
    const $tr = document.createElement('tr')

    const $td1 = document.createElement('td')
    const $a = document.createElement('a')
    $a.innerText = stock.name
    $a.title = stock.name
    $a.href = `/analisi/${encodeURI(stock.name?.toLowerCase().replace(/ /g, '-'))}?isin=${stock.isin}`
    $td1.appendChild($a)

    const $td2 = document.createElement('td')
    $td2.classList.add('red')
    $td2.innerText = stock.lastPrice?.value

    const $td3 = document.createElement('td')
    $td3.innerText = stock.mm20days?.value

    const $td4 = document.createElement('td')
    $td4.innerText = stock.mm40days?.value

    const $td5 = document.createElement('td')
    $td5.innerText = stock.mm100days?.value

    $tr.appendChild($td1)
    $tr.appendChild($td2)
    $tr.appendChild($td3)
    $tr.appendChild($td4)
    $tr.appendChild($td5)

    $downtrendTbody.appendChild($tr)
  }
}

const inTrendStocks = {
  init: (data, $root) => {
    print(data, $root)
  }
}

export default inTrendStocks
