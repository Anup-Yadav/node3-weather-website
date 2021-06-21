

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) =>{
        console.log(data)
    })
})





const varr = document.querySelector('form')
const srch =  document.querySelector('input')
const ms1 = document.querySelector('#m1')
const ms2 = document.querySelector('#m2')


varr.addEventListener('submit',(e) => {
    e.preventDefault()

    const vr = srch.value

    ms1.textContent = 'It is Loading'

    ms2.textContent = ''


    fetch('http://localhost:3000/weather_I?address='+ vr ).then((response) => {
    response.json().then((data) =>{


        if(data.error){
            ms1.textContent = data.error
        }
        else{
            ms1.textContent = data.location
            ms2.textContent = data.forecast
        }


    })
})


    
})