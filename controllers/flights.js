import { Flight } from '../models/flight.js'

function newFlight(req, res) {
    res.render('flights/new', {
        title: 'Add Flight'
    })
}

function create(req, res) {
    console.log('REQ.BODY:', req.body)
    // checks for and deletes empty inputs to allow default value to be supplied
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    Flight.create(req.body)
    .then(flight => {
        console.log('CREATED FLIGHT:', flight)
        res.redirect('/flights')
    })
    .catch(err => {
        console.log(err)
        res.redirect('flights/new')
    })
}

function index(req, res) {
    Flight.find({})
    .then(flights => {
        res.render('flights/index', {
            title: 'All Flights',
            flights: flights
        })
    })
}

export {
    newFlight as new,
    create,
    index,
}