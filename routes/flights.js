import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

/* GET flights listing. */
router.get('/new', flightsCtrl.new)

// POST -- localhost:3000/flights
router.post('/', flightsCtrl.create)

export {
  router
}
