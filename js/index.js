const start = async (selector) => {
  const champions = await fetch('/testData/skins.json')
    .then(response => response.json())
  console.log(champions)

  const championsForDisplay = await Promise.all(champions.map(champion => new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve({
        ...champion,
        image
      })
    })
    image.src = champion.squareImageUrl
  })))

  console.log(championsForDisplay)

  const wrapper = document.querySelector(selector)

  championsForDisplay.forEach(champion => {
    const chaDiv = document.createElement('div')
    chaDiv.setAttribute('class', 'small-cha')
    chaDiv.appendChild(champion.image)
    chaDiv.innerHTML += `<span>${champion.name}</span>`
    wrapper.appendChild(chaDiv)

    chaDiv.addEventListener('click', () => displayChampion(champion))
  })
}

const displayChampion = champion => {
  console.log(champion)
}

export default start
