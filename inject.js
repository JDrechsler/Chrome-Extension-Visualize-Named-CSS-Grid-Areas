function findGridAreas() {
    const body = document.getElementsByTagName('body')[0]
    const bodyChildTags = body.getElementsByTagName('*')
    const bodyChildTagsArray = [...bodyChildTags]
    bodyChildTagsArray.forEach(tag=>{

        const lengthExistingDivs = [...tag.childNodes].filter(c=>c.className === 'chromeExtensionCSSGrid').length

        if (lengthExistingDivs === 0) {
            const compStyles = document.defaultView.getComputedStyle(tag, null)
            const foundGridArea = compStyles.gridArea.split(" ")[0]
            if (foundGridArea !== 'auto') {
                console.log(`Create gridAreaVisual for ${foundGridArea}`)
                const areaDiv = createAreaDiv(foundGridArea)
                appendAreaToNode(tag, areaDiv)
            }
        }
    })
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createAreaDiv(areaNameString) {
    const areaDiv = document.createElement('div')
    areaDiv.innerText = areaNameString.toUpperCase()
    areaDiv.style.position = 'absolute'
    areaDiv.style.left = '50%'
    areaDiv.style.top = '50%'
    areaDiv.style.transform = 'translate(-50%, -50%)'
    areaDiv.style.margin = '0 auto'
    areaDiv.style.fontWeight = 'bold'
    areaDiv.style.backgroundColor = 'white'
    areaDiv.style.color = 'black'
    areaDiv.className = 'chromeExtensionCSSGrid'
    return areaDiv
}

function appendAreaToNode(nodeToAppend, areaDiv) {
    nodeToAppend.style.position = 'relative'
    nodeToAppend.style.border = `${getRandomColor()} solid 10px`
    nodeToAppend.appendChild(areaDiv)
}

findGridAreas()
console.log('injected')
