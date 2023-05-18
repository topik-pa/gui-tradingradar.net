import api from '../../../scripts/api.js'

const getHpAlerts = async () => {
  const $alerts = document.getElementById('hp-alerts')
  const $gcup = $alerts.querySelector('.gcup')
  const $gcdown = $alerts.querySelector('.gcdown')
  const $tiup = $alerts.querySelector('.tiup')
  const $tidown = $alerts.querySelector('.tidown')

  $alerts.classList.add('loading')
  try {
    const request = await api.get('api/custom')

    const gcupStock = request.body.gcup
    if (gcupStock === 0) {
      $gcup.querySelector('div:nth-of-type(2)').classList.remove('hide')
    } else {
      $gcup.querySelector('div:nth-of-type(3)').classList.remove('hide')
      $gcup.querySelector('img').src = `/assets/images/stocks/${gcupStock.code}-min.png`
      $gcup.querySelector('a h5').innerText = gcupStock.name
      $gcup.querySelector('a').href = `/analisi/${encodeURI(gcupStock.name.toLowerCase().replace(/ /g, '-'))}?isin=${gcupStock.isin}`
      $gcup.querySelector('#mm20days').innerText = gcupStock.mm20days.value.toFixed(2)
      $gcup.querySelector('#mm40days').innerText = gcupStock.mm40days.value.toFixed(2)
      $gcup.querySelector('#delta').innerText = `${(gcupStock.mm20days.value - gcupStock.mm40days.value).toFixed(2)}€ / ${((gcupStock.mm20days.value - gcupStock.mm40days.value) / (gcupStock.mm40days.value / 100)).toFixed(2)}%`
      $gcup.querySelector('#date').innerText = new Date(gcupStock.updatedAt).toLocaleString()
    }

    const gcdownStock = request.body.gcdown
    if (gcdownStock === 0) {
      $gcdown.querySelector('div:nth-of-type(2)').classList.remove('hide')
    } else {
      $gcdown.querySelector('div:nth-of-type(3)').classList.remove('hide')
      $gcdown.querySelector('img').src = `/assets/images/stocks/${gcdownStock.code}-min.png`
      $gcdown.querySelector('a h5').innerText = gcdownStock.name
      $gcdown.querySelector('a').href = `/analisi/${encodeURI(gcdownStock.name.toLowerCase().replace(/ /g, '-'))}?isin=${gcdownStock.isin}`
      $gcdown.querySelector('#mm20days').innerText = gcdownStock.mm20days.value.toFixed(2)
      $gcdown.querySelector('#mm40days').innerText = gcdownStock.mm40days.value.toFixed(2)
      $gcdown.querySelector('#delta').innerText = `${(gcdownStock.mm20days.value - gcdownStock.mm40days.value).toFixed(2)}€ / ${((gcdownStock.mm20days.value - gcdownStock.mm40days.value) / (gcdownStock.mm40days.value / 100)).toFixed(2)}%`
      $gcdown.querySelector('#date').innerText = new Date(gcdownStock.updatedAt).toLocaleString()
    }

    const tiupStock = request.body.tiup
    if (tiupStock === 0) {
      $tiup.querySelector('div:nth-of-type(2)').classList.remove('hide')
    } else {
      $tiup.querySelector('div:nth-of-type(3)').classList.remove('hide')
      $tiup.querySelector('img').src = `/assets/images/stocks/${tiupStock.code}-min.png`
      $tiup.querySelector('a h5').innerText = tiupStock.name
      $tiup.querySelector('a').href = `/analisi/${encodeURI(tiupStock.name.toLowerCase().replace(/ /g, '-'))}?isin=${tiupStock.isin}`
      $tiup.querySelector('#mm40days').innerText = tiupStock.mm40days.value.toFixed(2)
      $tiup.querySelector('#mm100days').innerText = tiupStock.mm100days.value.toFixed(2)
      $tiup.querySelector('#lastprice').innerText = tiupStock.lastPrice.value.toFixed(2)
      $tiup.querySelector('#date').innerText = new Date(tiupStock.updatedAt).toLocaleString()
    }

    const tidownStock = request.body.tidown
    if (tidownStock === 0) {
      $tidown.querySelector('div:nth-of-type(2)').classList.remove('hide')
    } else {
      $tidown.querySelector('div:nth-of-type(3)').classList.remove('hide')
      $tidown.querySelector('img').src = `/assets/images/stocks/${tidownStock.code}-min.png`
      $tidown.querySelector('a h5').innerText = tidownStock.name
      $tidown.querySelector('a').href = `/analisi/${encodeURI(tidownStock.name.toLowerCase().replace(/ /g, '-'))}?isin=${tidownStock.isin}`
      $tidown.querySelector('#mm40days').innerText = tidownStock.mm40days.value.toFixed(2)
      $tidown.querySelector('#mm100days').innerText = tidownStock.mm100days.value.toFixed(2)
      $tidown.querySelector('#lastprice').innerText = tidownStock.lastPrice.value.toFixed(2)
      $tidown.querySelector('#date').innerText = new Date(tidownStock.updatedAt).toLocaleString()
    }

    $alerts.classList.remove('loading')
  } catch (error) {
    $alerts.classList.add('error')
    console.error(error)
  } finally {
    $alerts.classList.remove('loading')
  }
}

const hpAlerts = {
  init: async () => {
    await getHpAlerts()
  }
}

export default hpAlerts
