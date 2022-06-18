import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

/* GET flights listing. */
router.get('/new', flightsCtrl.new)

export {
  router
}
