import api from '../scripts/api.js'

const home = {
  init: () => {
    api.get('/api/stocks')
  }
}

export default home
