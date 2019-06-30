const start = async (selector) => {
  const champions = await fetch('/testData/skins.json')
    .then(response => response.json())

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

  const wrapper = document.querySelector(selector)

  championsForDisplay.forEach(champion => {
    const chaDiv = document.createElement('div')
    chaDiv.setAttribute('class', 'small-cha')
    chaDiv.appendChild(champion.image)
    chaDiv.innerHTML += `<span>${champion.name}</span>`
    wrapper.appendChild(chaDiv)

    chaDiv.addEventListener('click', (e) => displayChampion(e, champion))
  })
}

const displayChampion = (event, champion) => {
  console.log(champion)
  const skinPopUp = document.createElement('div')
  skinPopUp.setAttribute('class', 'skin-pop-up')

  document.body.appendChild(skinPopUp)
  const { top: targetTop, left: targetLeft } = skinPopUp.getClientRects()[0]
  const targetWidth = window.innerWidth * 0.7
  const targetHeight = targetWidth * 6 / 11
  const targetPosition = {
    top: targetTop + 'px',
    left: targetLeft + 'px',
    height: targetHeight + 'px',
    width: targetWidth + 'px'
  }

  // Get position and dimension of clicked element.
  const clickedElement = event.target

  // Bottom is bottom of element from top and right is right from left.
  const { left: clickedLeft, top: clickedTop, right: clickedRight, bottom: clickedBottom } = clickedElement.getBoundingClientRect()
  const clickedWidth = (clickedRight - clickedLeft)
  const clickedHight = (clickedBottom - clickedTop)
  const startPosition = {
    left: clickedLeft + 'px',
    top: clickedTop + 'px',
    width: clickedWidth + 'px',
    height: clickedHight + 'px'
  }

  // Position overlay where clicked element is.
  // Make sure to use Object.assign here, spread doesn't work.
  Object.assign(skinPopUp.style, startPosition)

  // Add wrapped champion Icon with loader to pop-up.
  const championImage = champion.image.cloneNode()
  championImage.setAttribute('class', 'skin-pop-up__champion-image')
  const championImageWrapper = document.createElement('div')
  championImageWrapper.setAttribute('class', 'skin-pop-up__image-wrapper')
  championImageWrapper.innerHTML = `
  <div class="loader">
    <svg class="circular" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
    </svg>
  </div>`
  championImageWrapper.appendChild(championImage)
  skinPopUp.appendChild(championImageWrapper)

  skinPopUp.animate([startPosition, targetPosition], {
    duration: 300,
    fill: 'forwards',
    easing: 'ease-out'
  })
}

export default start
