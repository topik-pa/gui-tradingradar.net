import stockInfo from '../../components/analisi/stock_info/stock_info.js'

const analisi = {
  init: async () => {
    await stockInfo.init()
  }
}

export default analisi
