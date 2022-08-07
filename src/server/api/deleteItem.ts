import express from 'express'
const router = express.Router()

router.delete('/sock', (req, res) => {
    res.send('deleted')
})


router.delete('/location', (req, res) => {
    res.send('deleted')
})

router.delete('/history', (req, res) => {
    res.send('deleted')
})

router.delete('/officer', (req, res) => {
    res.send('deleted')
})

export default router