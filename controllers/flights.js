import { Flight } from '../models/flight.js'

function newFlight(req, res) {
    const newFlight = new Flight()
    const defaultDate = newFlight.departs
    const formattedDate = defaultDate.toISOString().slice(0,16)
    res.render('flights/new', {
        title: 'Add Flight',
        departs: formattedDate
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
        res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
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
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id)
    .then(flight => {
        res.redirect('/flights')
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
}

function show(req, res) {
    Flight.findById(req.params.id)
    .populate('meal')
    .then(flight => {
        res.render('flights/show', {
            title: 'Flight Details',
            flight,
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
}

function edit(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        res.render('flights/edit', {
            title: 'Edit Flight',
            flight: flight
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
}

function update(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(flight => {
        res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
}

function createTicket(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.tickets.push(req.body)
        flight.save()
        .then(() => {
            res.redirect(`/flights/${flight._id}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
}

function deleteTicket(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        const ticketNumber = req.params.ticketId
        console.log('TICKET ID:', ticketNumber)
        flight.tickets.remove(ticketNumber)
        flight.save()
        .then(() => {
            res.redirect(`/flights/${flight._id}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
}

export {
    newFlight as new,
    create,
    index,
    deleteFlight as delete,
    show,
    edit,
    update,
    createTicket,
    deleteTicket,
}