const marketCap = document.querySelector('#mcap')
const volume = document.querySelector('#volume')
const dominance = document.querySelector('#dominance')
const tableBodyEl = document.querySelector('#table-body')
const table = document.querySelector('table')
const button = document.querySelector('.btn')

const getMarketData = async () => {
  const response = await fetch('https://api.coinlore.net/api/global/')

  if (response.status === 200) {
    const marketData = await response.json()
    return marketData
  } else {
    throw new Error()
  }
}

const getCoins = async () => {
  const response = await fetch('https://api.coinlore.net/api/tickers/')

  if (response.status === 200) {
    const coins = await response.json()

    return coins
  } else {
    throw new Error()
  }
}

const createChangeEl = changeData => {
  const changeEl = document.createElement('td')
  const spanEl = document.createElement('span')
  spanEl.textContent = `${changeData}%`
  if (changeData < 0) {
    spanEl.classList.add('change-red')
  } else if (changeData > 0) {
    spanEl.classList.add('change-green')
  }
  changeEl.appendChild(spanEl)
  return changeEl
}

const renderTable = data => {
  data.forEach(coin => {
    const {
      rank,
      symbol,
      name,
      price_usd,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d,
      volume24,
      market_cap_usd,
      csupply
    } = coin

    const tableRowEl = document.createElement('tr')
    const tRankEl = document.createElement('td')
    const tCoinEl = document.createElement('td')
    const coinLogo = document.createElement('img')
    const coinName = document.createElement('span')
    const coinSymbol = document.createElement('span')
    const tPriceEl = document.createElement('td')
    const t1hEl = document.createElement('td')
    const t24hEl = document.createElement('td')
    const t7dEl = document.createElement('td')
    const tVolumeEl = document.createElement('td')
    const tMcapEl = document.createElement('td')
    const tSupplyEl = document.createElement('td')

    //console.log(coin)

    tRankEl.textContent = rank
    tableRowEl.appendChild(tRankEl)

    coinLogo.setAttribute('src', `img/coins/${symbol}.png`)
    tCoinEl.appendChild(coinLogo)
    coinName.textContent = name
    coinSymbol.textContent = `[${symbol}]`
    coinSymbol.classList.add('symbol')
    tCoinEl.appendChild(coinName)
    tCoinEl.appendChild(coinSymbol)
    tableRowEl.appendChild(tCoinEl)

    tPriceEl.textContent = `$${price_usd}`
    tableRowEl.appendChild(tPriceEl)

    tableRowEl.appendChild(createChangeEl(percent_change_1h))
    tableRowEl.appendChild(createChangeEl(percent_change_24h))
    tableRowEl.appendChild(createChangeEl(percent_change_7d))

    tVolumeEl.textContent = `${(volume24 / 1e9).toFixed(2)} B $`
    tableRowEl.appendChild(tVolumeEl)

    tMcapEl.textContent = `${(market_cap_usd / 1e9).toFixed(2)} B $`
    tableRowEl.appendChild(tMcapEl)

    tSupplyEl.textContent = csupply
    tableRowEl.appendChild(tSupplyEl)

    tableBodyEl.appendChild(tableRowEl)
  })
}

getMarketData()
  .then(marketData => {
    marketCap.textContent = `${(marketData[0].total_mcap / 1e9).toFixed(2)} B $`
    volume.textContent = `${(marketData[0].total_volume / 1e9).toFixed(2)} B $`
    dominance.textContent = `${marketData[0].btc_d} %`
  })
  .catch(err => {
    console.log(`Error: ${err}`)
  })

getCoins()
  .then(coinsData => {
    const { data } = coinsData
    renderTable(data)
    //console.log(data)
  })
  .catch(err => {
    console.log(`Error: ${err}`)
  })

// toggle.addEventListener('change', e => {
//   if (toggle.checked) {
//     table.setAttribute('id', 'dtBasicExample')
//     console.log(toggle.checked)
//     getCoins()
//       .then(coinsData => {
//         const { data } = coinsData
//         renderTable(data)
//       })
//       .catch(err => {
//         console.log(`Error: ${err}`)
//       })
//   }
// })

table.setAttribute('id', 'dtBasicExample')
