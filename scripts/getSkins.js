const http = require('https')
const fs = require('fs')

const fetchJson = url =>
  new Promise((resolve, reject) => {
    http
      .get(url, res => {
        let body = ''

        res.on('data', chunk => {
          body += chunk
        })

        res.on('end', () => {
          try {
            const parsed = JSON.parse(body)
            resolve(parsed)
          } catch (e) {
            console.log('Failed to parse JSON response!')
            console.log(e)
            console.log('Body:')
            console.log(body)
          }
        })
      })
      .on('error', e => {
        reject(e)
      })
  }).catch(e => {
    console.log('Error in fetching JSON:')
    console.log('URL was: ', url)
    console.log(e)
  })

const skinIdToNumber = (id, championKey) => {
  const idString = id.toString()
  const numberAsString = idString
    .replace(championKey.toString(), '')
    .replace(/0?/, '')

  // Catch the case of id = 0 where we delete the entire string and have '' here.
  return numberAsString ? parseInt(numberAsString) : 0
}

// We a short version of the skins name which does not contain the champions name.
const createShortName = (skinName, championName) => {
  const proposedShortName = skinName
    .replace(championName, '')
    .replace('  ', ' ')
    .trim()
  return proposedShortName || 'Default'
}

const start = async () => {
  const versions = await fetchJson(
    'https://ddragon.leagueoflegends.com/api/versions.json'
  )
  const currentVersion = versions[0]
  console.log('Current Client version: ', currentVersion)

  // Build up an array of all champions.
  const championResponse = await fetchJson(
    `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/champion.json`
  )
  const champions = []
  // We get a dictionary that we turn into an array.
  for (let key in championResponse.data) {
    champions.push(championResponse.data[key])
  }
  console.log(`Found ${champions.length} champions`)

  console.log('Getting additional data...')
  const totalChampions = champions.length
  let fetchedChampions = 0
  const championsWithSkins = await Promise.all(
    champions.map(
      champion =>
        new Promise(async (resolve, reject) => {
          const moreChampionData = await fetchJson(
            `https://cdn.communitydragon.org/${currentVersion}/champion/${
              champion.key
            }/data`
          )
          const skins = moreChampionData.skins.map(skin => {
            const number = skinIdToNumber(skin.id, champion.key)
            return {
              name: skin.name,
              isBase: skin.isBase,
              rarity: skin.rarity.replace(/^k/, ''),
              isLegacy: skin.isLegacy,
              description: skin.description,
              number,
              splashImageUrl: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${
                champion.id
              }_${number}.jpg`,
              loadingImageUrl: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${
                champion.id
              }_${number}.jpg`,
              shortName: createShortName(skin.name, champion.name),
            }
          })
          fetchedChampions += 1
          console.log(
            `Fetched champions: ${fetchedChampions}/${totalChampions}`
          )
          resolve({
            name: champion.name,
            id: champion.id,
            key: champion.key,
            title: champion.title,
            skins,
            squareImageUrl: `http://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${
              champion.id
            }.png`,
          })
        })
    )
  )

  console.log('Saving skins to json.')
  fs.writeFile('public/skins.json', JSON.stringify(championsWithSkins), err => {
    if (err) return console.wanr(err)
    console.log('Done.')
  })
}

start()
