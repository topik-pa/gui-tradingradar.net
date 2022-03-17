// import api from '../scripts/api.js'
import stocksList from '../components/index/stocks_list/stocks_list.js'
import apiList from '../components/index/api_list/api_list.js'
import aggregator from '../components/index/aggregator/aggregator.js'

const index = {
  init: async () => {
    // const stocksReq = await api.get('/api/stocks')
    stocksList.init()
    const apiListWStocks = await apiList.init()
    aggregator.init(apiListWStocks)
  }
}

export default index
