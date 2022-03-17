// import api from '../../../scripts/api.js'
const $root = document.getElementById('aggregator')
const aggregators = {
  performance: {
    id: 0,
    name: 'perf1M',
    stocks: undefined,
    value: undefined,
    get iconValue () {
      let iconValue
      switch (true) {
      case (this.value > 10):
        iconValue = 5
        break
      case (this.value > 5 && this.value <= 10):
        iconValue = 4
        break
      case (this.value >= 0 && this.value <= 5):
        iconValue = 3
        break
      case (this.value < 0 && this.value >= -5):
        iconValue = 2
        break
      case (this.value < -5 && this.value >= -10):
        iconValue = 1
        break
      case (this.value < -10):
        iconValue = 0
        break
      default:
        iconValue = ''
        break
      }
      return `/assets/images/gauge/gauge_${iconValue}-min.png`
    }
  }
}

function setPerfAggregatorValue () {
  let value = 0
  const length = aggregators.performance.stocks.length
  for (const stock of aggregators.performance.stocks) {
    const perfValue = stock[aggregators.performance.name].value
    const toNum = parseInt(perfValue.replace(',', '.').replace('%', ''))
    value += toNum
  }
  aggregators.performance.value = (value / length)
}
function printPerfAggregatorValue () {
  const $gauge = $root.querySelector('.performance img')
  const $value = $root.querySelector('span')
  $gauge.src = aggregators.performance.iconValue
  $value.innerText = aggregators.performance.value
}

const aggregator = {
  init: (apiListWStocks) => {
    // Populate the local stocks
    for (const api of apiListWStocks) {
      if (api.name === 'perf1M') {
        aggregators.performance.stocks = api.stocks
      }
    }

    // Populate Perf Aggregator value
    setPerfAggregatorValue()
    // Print Perf Aggregator value
    printPerfAggregatorValue()
  }
}

export default aggregator
