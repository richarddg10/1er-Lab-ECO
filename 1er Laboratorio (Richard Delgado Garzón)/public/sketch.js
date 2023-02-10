let canvas
let randomUserURL
let bitcoinURL
let dataUsaURL
let dogURL
let catURL

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function draw() {
    background(0, 250, 0);
    newCursor();


    if (randomUserURL !== undefined) {
        fill(255, 0, 0)
        text (`${randomUserURL.results[0].email}`, 50, 50)
        text (`${randomUserURL.results[0].gender}`, 250, 50)
    }

    if (bitcoinURL !== undefined) {
        fill(0)
        text (`${bitcoinURL.chartName}`, 50, 100)
        text (`${bitcoinURL.disclaimer}`, 250, 100)
        text (`${bitcoinURL.time.updated}`, 50, 120)
    }

    if (dataUsaURL !== undefined) {
        fill(255, 0, 0)
        text (`${dataUsaURL.data[0].Nation}`, 50, 150)
        text (`${dataUsaURL.data[0].Population}`, 250, 150)
        text (`${dataUsaURL.data[0].Year}`, 50, 170)
    }

    if (dogURL !== undefined) {
        fill(0)
        image (dogURL, 50, 200, 100, 100)
    }

    if (catURL !== undefined) {
        fill(0)
        text (`${catURL.fact}`, 50, 350)
    }
}

function mouseClicked() {
    getDataRandomUser()
    getDataBitcoin()
    getDataUsa()
    getDataDog()
    getDataCat()
}

async function getDataRandomUser() {
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json()
    randomUserURL = data
    console.log(randomUserURL.results[0])
}

async function getDataBitcoin() {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    const data = await response.json()
    bitcoinURL = data
    console.log(bitcoinURL)
}

async function getDataUsa() {
    const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
    const data = await response.json()
    dataUsaURL = data
    console.log(dataUsaURL.data)
}

async function getDataDog() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await response.json()
    dogURL = loadImage(data.message)
    console.log(dogURL)
}

async function getDataCat() {
    const response = await fetch('https://catfact.ninja/fact')
    const data = await response.json()
    catURL = data
    console.log(catURL)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}