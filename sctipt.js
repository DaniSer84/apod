// fetch('https://api.nasa.gov/planetary/apod?start_date=2022-10-15&end_date=2022-10-18&api_key=XYswldWzwZ4wzaTzIQfuaFdAosyFN0jaz12h92dI')
//     .then(res => res.json())
//     .then(photos => {
//         console.log(photos)
        
//         let main = document.querySelector('main')
        
//         photos.forEach(photo => {
//             console.log(photo.title)
//             let img = document.createElement('img')

//             img.src = photo.url 
//             main.append(img)
//         });
//     })

// siccome sto usando una cartella mock, posso fare la fetch direttamente dalla cartella e non dal sito della nasa:
// il vantaggio di utilizzare un mock, siccome dalla API arriva un formato in json, noi abbiamo creato nella mock un file dello stesso formato, quindi non abbiamo bisogno di fare i passaggi per trasformare i dati (??)
// altra cosa utile è mettersi le variabile in un punto del codice in alto, o magari utilizzo i moduli (per essere più preciso con l'organizzazione)

let date = new Date()

let [day, month, year] = [date.getDate(), date.getMonth()+1, date.getFullYear()]
console.log(day, month, year)

let tenDaysLess = (date) => {
    timestamp = date.getTime()
    const tenDaysMillisec = 864000000
    let millisecs = timestamp - tenDaysMillisec
    let tenDaysAgo = new Date(millisecs)
    return tenDaysAgo
}


let subtractDaystoDate = (date, days) => {
    let d = new Date()
    d.setDate(date.getDate() - days)
    return d
}

let twelveDaysAgo = subtractDaystoDate(date, 12)
console.log(twelveDaysAgo)

tenDaysLess(date)
console.log(tenDaysLess(date))
let date2 = tenDaysLess(date)

let dateFormatAPI = (date) => {
    let [day, month, year] = [date.getDate(), date.getMonth()+1, date.getFullYear()]
    let format = `${year}-${month}-${day}`
    return format
}

console.log(dateFormatAPI(twelveDaysAgo))

console.log(dateFormatAPI(date))
console.log(dateFormatAPI(date2))
// let giorno = tenDaysAgo.getDate()
// let mese = tenDaysAgo.getMonth()+1
// let anno = tenDaysAgo.getFullYear()

// let DateFormatAPI = `${anno}-${mese}-${giorno}`
// console.log(tenDaysDateFormatAPI)





let start_date = dateFormatAPI(twelveDaysAgo)
let end_date = dateFormatAPI(date)

console.log(start_date)
console.log(end_date)


let api_key = 'XYswldWzwZ4wzaTzIQfuaFdAosyFN0jaz12h92dI'

let astronomyPictures = `https://api.nasa.gov/planetary/apod?start_date=${start_date}&end_date=${end_date}&api_key=${api_key}&thumbs=true`

// posso usare il file json: per non impattare sul numero limitato di chiamate api. Quando invece voglio avere le info reali, posso commentare questa variabile qui sotto.
// astronomyPictures = 'mock/astronomy-pictures.json'

let mainPicture = document.querySelector('#main-picture')
let picturesContainer = document.querySelector('.pictures-container')
let modal = document.querySelector('.modal')
let modalTextContainer = document.querySelector('.modal-text-container')
let modalImageContainer = document.querySelector('.modal-img-container')


// fetch(astronomyPictures)
//     .then(res => res.json())
//     .then(pictures => {
        
//         pictures.forEach(picture => {
//             let pictureContainer = document.createElement('div')
//             let img = document.createElement('img')
//             let title = document.createElement('h5')
//             img.src = picture.url 
//             img.alt = 'the image did not load'
//             title.textContent = picture.title

//             pictureContainer.classList.add('picture-container')
//             container.append(pictureContainer)
//             pictureContainer.append(img)
//             pictureContainer.append(title)

//         })
//     })

// quindi, con l'html abbiamo fatto un esempio di quello che vogliamo ottenere. Ora, per renderlo più dinamico, iniziamo a smontarlo ed usare javascript invece. Inizialmente pescando i dati mock poi alla fine andando a prendere la API.

// man mano che diventiamo esperti di javascript, vediamo che il file html diventa sempre più piccolo, perché usiamo sempre di più js. Perché abbiamo la necessità di creare cose sempre più dinamiche. 
// quando impareremo react, che ha una sintassi che ci semplificherà la vita con js, nell'html resterà solo un body con un div e un id. React parte da questo div, se lo porta in js, poi scrive il dom. 


// è sempre consigliato mettere tutto come funzione, quindi:

let fetchPictures = () => {
    let pictures = fetch(astronomyPictures)
    .then(res => {
        console.log(res)
        if (res.ok) {
            return res.json()
        } else {
            throw new Error(res.status)
        }
    })
    .catch(
        error => {
            console.log(error)
            mainPicture.innerHTML = `<h4>${error}</h4>`
            picturesContainer.innerHTML = `<h4>${error}</h4>`
        }
    )
    // se abbiamo del codice che vogliamo sia eseguito sia che una promise vada a buon fine che no, lo mettiamo nel finally:
    .finally(() => console.log('fine!'))
    return pictures
}

function selectUrl(picture) {
    if (picture.media_type == 'image') {
       return picture.url
    } else if (picture.media_type == 'video') {
        return picture.thumbnail_url
    } else
    return 'img/placeholder.png'
}

function openModal (picture, img) {
    let title = document.createElement('h3')
    let description = document.createElement('p')

    title.textContent = picture.title
    description.textContent = picture.explanation

    modal.classList.add('modal-show')
    modal.append(modalImageContainer)
    modal.append(modalTextContainer)
    modalImageContainer.append(img)
    modalTextContainer.append(title)
    modalTextContainer.append(description)
}

function closeModal (containerName, img) {
    modal.classList.remove('modal-show')
        modalTextContainer.innerHTML = ''
        containerName.prepend(img)
}

function createGallery(array) {

    picturesContainer.innerHTML = ''
    array.forEach(picture => {

        let pictureContainer = document.createElement('div')
        let img = document.createElement('img')
        let textContainer = document.createElement('div')
        let title = document.createElement('h5')
        let description = document.createElement('p')

        textContainer.classList.add('text-container-pic')
        let modal = document.querySelector('.modal')

        img.addEventListener('click', () => openModal(picture, img))

        modal.addEventListener('click', () => closeModal(pictureContainer, img))
        
        img.src = selectUrl(picture)
        img.alt = 'the image did not load'
        img.title = 'Watch bigger!'
        title.textContent = picture.title
        title.classList.add('arrowup-title')
        description.textContent = picture.explanation
        description.classList.add('hide')

        textContainer.addEventListener('click', () => {
            description.classList.toggle('hide')
            title.classList.toggle('arrowup-title')
            title.classList.toggle('arrowdown-title')
        })
        pictureContainer.classList.add('picture-container')
        picturesContainer.append(pictureContainer)
        pictureContainer.append(img)
        pictureContainer.append(textContainer)
        textContainer.append(title)
        textContainer.append(description)

    })
}

let todaysPicture = (array) => {
    
    mainPicture.innerHTML = ''

    let picture = array[0]
    
    let textContainer = document.createElement('div')
    let img = document.createElement('img')
    let title = document.createElement('h3')
    let description = document.createElement('p')
    textContainer.classList.add('text-container')
    let modal = document.querySelector('.modal')

    img.addEventListener('click', () => openModal(picture, img))

    modal.addEventListener('click', () => closeModal(mainPicture, img))

    title.textContent = picture.title
    description.textContent = picture.explanation
    img.src = selectUrl(picture)
    img.alt = 'the image did not load'
    img.title = 'Watch bigger!'
    mainPicture.append(img)
    mainPicture.append(textContainer)
    textContainer.append(title)
    textContainer.append(description)
    
}

// estrarre l'immagine odierna
// creare il contenuto main picture
// la prima immagine dovrà essere quella di ieri.

let fetchedPictures = fetchPictures()
    .then(pictures =>  {
        pictures.reverse()
        todaysPicture(pictures)
        let previousImages = pictures.slice(1)
        // console.log(previousImages)
        createGallery(previousImages)
    })


const curiosityData = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json'

let marsWeatherData = []


function fetchCuriosityData() {
    let data = fetch(curiosityData)
    .then(res => res.json())
    .then(data => data.soles)
    return data
}

fetchCuriosityData().then(
    res => {
        for (let i=0; i < 668; i++) {
            marsWeatherData.push(res[i])
        }
        return marsWeatherData
    }
    ).then(data => {
        
        let today = data[0]
        console.log(today)
        document.querySelector('#mars-today').innerHTML = `
            <h2><span>Curiosity</span>* Today!</h2>
            <p>This is my ${today.sol}th sol.</p>
            <p>Today the weather is ${today.atmo_opacity} and the  temperature is between ${today.min_temp} and ${today.max_temp} Celsius degrees.</p>
        `
        // console.log(marsWeatherData)
        google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => {myChart(data)});
    
})



let myChart = (weatherData) => {
    
    let formattedData = weatherData.map(data => {
        return [data.sol, +data.min_temp, +data.max_temp]
    })
    
    
    var chartData = [
        ['Date', 'Min', 'Max'],
    ]
    
    formattedData = formattedData.reverse()
    for (let data of formattedData) {
        chartData.push(data)
    }
    
    let finalData = google.visualization.arrayToDataTable(chartData)
    
    let options = {
        title: 'Weather on Mars for the last martian year*',
        curveType: 'function',
        legend: { position: 'bottom'},
        hAxis: {title: 'Sols'},
        vAxis: {title: 'Temp (Celsius)'}
    }
    
    let chart = new google.visualization.LineChart(document.getElementById('mars-data'));
    
    chart.draw(finalData, options);
    
    
    
}



