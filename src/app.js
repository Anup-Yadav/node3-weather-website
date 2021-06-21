const pth = require('path')
const expres = require('express')
const hbss = require('hbs')

const ap = expres()

// console.log(__dirname)
// console.log(__filename)

// console.log(pth.join(__dirname, '../public')) 


const addre = pth.join(__dirname, '../public')
const nvw = pth.join(__dirname,'../templates/views')
const prpth = pth.join(__dirname,'../templates/partials')



ap.set('view engine','hbs')
ap.set('views',nvw)
hbss.registerPartials(prpth)



ap.use(expres.static(addre))

// ap.get('', (req,res) => {
//     // res.send('It is the main page of the website')
//     res.send('<h1> It is the main page website </h1>')
// })



// ap.get('/help', (req,res) => {
//     // res.send('It is the help page')

//     res.send([{
//         name : "Anup"
//     },{
//         nickname : "Dhaked"
//     }])
// })

// ap.get('/about', (req,res) => {
//     // res.send('It is the about page')
//     res.send(' <h1> It is the about page </h1> ')
// })

ap.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        nickname : "andrewm",
        name : "Dhaked"
    })
})

ap.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name: 'Anup',
        location: 'India'
    })
})


ap.get('/help',(req,res) => {
    res.render('help',{
        title:'Help Me',
        name :'Yadav',
        Helpful_txt : 'This is some helpful text.'

    })
})

const frst = require('./utils/forecast.js')

const gcd = require('./utils/geocode.js')


ap.get('/weather_I', (req,res) => {
    // res.send('Your Weather Data is Shown Here:- ')
    if(!req.query.address){
        return res.send({
            error:'Please atleast provide any address as Input'
        })
    }

    gcd(req.query.address,(error,{latitude,longitude,location}= {}) => {
        if(error){
            return res.send({error})
        }
        frst(latitude,longitude,(error,frstData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: frstData,
                location,
                address: req.query.address
            })
        })
    })









    // console.log(req.query.address)
    // res.send({
    //     forecast : 'It is really hot',
    //     location : 'pheladelphia',
    //     address : req.query.address
    // })
})


ap.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must atleast provide any product.'
        })
    }
    console.log(req.query.search)
    res.send({
        products:'[]'
    })
})



// ap.get('./help/*',(req,res) => {
//     res.send("Help article not found !")
// })


ap.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'anup',
        errorMessage:'help article not found!'

    })
})





// ap.get('*',(req,res) => {
//     res.send("My 404 Error Page")
// })

ap.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'anup',
        errorMessage:'page not found!'

    })
})

ap.listen(3000)