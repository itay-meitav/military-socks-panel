import express from 'express'
import addApi from './addItem'

const router = express.Router()

router.use('/add', addApi)

export default router