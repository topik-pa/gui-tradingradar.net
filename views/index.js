// import api from '../scripts/api.js'
import stocksList from '../components/index/stocks_list/stocks_list.js'
import apiList from '../components/index/api_list/api_list.js'

const index = {
  init: async () => {
    // const stocksReq = await api.get('/api/stocks')
    stocksList.init()
    apiList.init()
  }
}

export default index
