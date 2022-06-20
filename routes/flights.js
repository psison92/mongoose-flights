import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

// GET -- localhost:3000/flights
router.get('/', flightsCtrl.index)

/* GET flights listing. */
router.get('/new', flightsCtrl.new)

// GET -- localhost:3000/flights/:id
router.get('/:id', flightsCtrl.show)

// POST -- localhost:3000/flights
router.post('/', flightsCtrl.create)

// DELETE -- localhost:3000/flights/:id
router.delete('/:id', flightsCtrl.delete)

export {
  router
}
