// import api from '../scripts/api.js'
import stocksList from '../components/index/stocks_list/stocks_list.js'

const index = {
  init: async () => {
    // const stocksReq = await api.get('/api/stocks')
    stocksList.init()
  }
}

export default index
