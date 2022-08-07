import express from 'express'
import addApi from './addItem'
import editApi from './editItem'
import deleteApi from './deleteItem'

const router = express.Router()

router.use('/add', addApi)
router.use('/edit', editApi)
router.use('/delete', deleteApi)

router.put('/reset', async (req, res) => {
    try {
        await require('../db/sqlScript.js')()
        res.json({ success: true })
    } catch (error) {
        res.json({ success: false, error })
    }
})

export default router