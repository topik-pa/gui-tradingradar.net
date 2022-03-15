
const $root = document.getElementById('stocks_list')
const $alphabet = $root.getElementsByClassName('alphabet')[0]
const $stocks = $root.getElementsByClassName('stocks')[0]
const activeLetters = new Set()

function manageAlphabetClicks () {
  const letters = $alphabet.querySelectorAll('span')
  Array.from(letters).forEach(($letter) => {
    if (!activeLetters.has($letter.innerText)) {
      $letter.classList.add('disabled')
    } else {
      $letter.addEventListener('click', () => {
        alphabetShowHideStocks($letter.innerText)
      })
    }
  })
}

function alphabetShowHideStocks (letter = 'A') {
  const stockList = $stocks.getElementsByClassName('stock')
  Array.from(stockList).forEach(($stock) => {
    activeLetters.add($stock.dataset.letter)
    if ($stock.dataset.letter.toUpperCase() === letter) {
      $stock.classList.remove('hide')
    } else {
      $stock.classList.add('hide')
    }
  })
}

const stocksList = {
  init: () => {
    alphabetShowHideStocks()
    manageAlphabetClicks()
  }
}

export default stocksList
