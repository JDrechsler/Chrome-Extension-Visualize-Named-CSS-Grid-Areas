function findGridAreas() {
	const body = document.getElementsByTagName('body')[0]
	const bodyChildTags = body.getElementsByTagName('*')
	const bodyChildTagsArray = [...bodyChildTags]
	bodyChildTagsArray.forEach(tag => {

		const lengthExistingDivs = [...tag.childNodes].filter(c => c.className === 'chromeExtensionCSSGrid').length

		if (lengthExistingDivs === 0) {
			const compStyles = document.defaultView.getComputedStyle(tag, null)
			const foundGridArea = compStyles.gridArea.split(" ")[0]
			if (foundGridArea !== 'auto') {
				console.log(`Create gridAreaVisual for ${foundGridArea}`)
				let colorString = 'FFFFFF'
				do {
					colorString = getRandomColor()
				} while (getContrast(colorString.replace('#', '')) !== 'dark');

				const areaDiv = createAreaDiv(foundGridArea, colorString)
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

	console.log(getContrast(color.replace('#', '')))
	return color;
}

function getContrast(hexcolor) {
	var r = parseInt(hexcolor.substr(0, 2), 16);
	var g = parseInt(hexcolor.substr(2, 2), 16);
	var b = parseInt(hexcolor.substr(4, 2), 16);
	var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
	return (yiq >= 128) ? 'bright' : 'dark';
}

function createAreaDiv(areaNameString, colorString) {
	const areaDiv = document.createElement('div')
	areaDiv.innerText = areaNameString.toUpperCase()
	areaDiv.style.position = 'absolute'
	areaDiv.style.left = '50%'
	areaDiv.style.top = '50%'
	areaDiv.style.transform = 'translate(-50%, -50%)'
	areaDiv.style.margin = '0 auto'
	areaDiv.style.fontWeight = 'bold'
	areaDiv.style.fontSize = '21px';
	areaDiv.style.backgroundColor = 'white'
	areaDiv.style.color = colorString
	areaDiv.className = 'chromeExtensionCSSGrid'
	return areaDiv
}

function appendAreaToNode(nodeToAppend, areaDiv) {
	nodeToAppend.style.position = 'relative'
	nodeToAppend.style.border = `${areaDiv.style.color} solid 10px`
	nodeToAppend.appendChild(areaDiv)
}

findGridAreas()
console.log('injected')
