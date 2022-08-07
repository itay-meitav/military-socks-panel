import express from 'express'
import { isArmyIdExists, isBaseExists, isSockExists, isOfficerExists, isLocationExists, addHistory, addLocation, addOfficer, addSock } from '../db'

const router = express.Router()

router.post('/sock', async (req, res) => {
    const {
        model,
        officerId,
        quantity,
        size,
        year,
        locationId,
    } = req.body

    if (model && officerId && quantity && size && year && locationId) {
        const isExists = (await Promise.all([isLocationExists(Number(locationId)), isOfficerExists(Number(officerId))])).every(Boolean)
        if (isExists) {
            const id = await addSock({
                model,
                officerId,
                quantity,
                size,
                year,
                locationId
            })
            if (id)
                res.redirect('/socks?id=' + id)
            else
                res.json({ message: 'something went wront please try again later', success: false })
        }
        else {
            res.json({ messgae: 'dont play with our api, you\'ll get yourself banned', success: false })
        }
    } else {
        res.json({ message: 'make sure to send all the necessary fields', success: false })
    }
})
router.post('/location', async (req, res) => {
    const {
        city,
        base,
        lon,
        lat
    } = req.body

    if (city && base && lon && lat) {
        const isExist = await isBaseExists(base)

        if (isExist) {
            res.json({ message: 'this base already exists', success: false })
        } else {
            const id = await addLocation({ nearestCity: city, baseName: base, lon, lat })
            res.redirect('/locations?id=' + id)
        }

    } else {
        res.json({ message: 'make sure you have all the necessary fields', success: false })
    }
})
router.post('/history', async (req, res) => {
    const {
        arrivalDate,
        departureDate,
        locationId,
        sockId
    } = req.body

    if (arrivalDate && departureDate && locationId && sockId) {
        const isExists = (await Promise.all([isLocationExists(Number(locationId)), isSockExists(Number(sockId))])).every(Boolean)

        if (isExists) {
            const id = await addHistory({ arrivalDate, departureDate, locationId, sockId })
            res.redirect('/history?id=' + id)
        }
        else {
            res.json({ message: 'dont play with our api. it\'s not a playground', success: false })
        }
    } else {
        res.send({ message: 'make sure to fill all the necessary fields', success: false })
    }

})
router.post('/officer', async (req, res) => {
    const {
        email,
        name,
        phone,
        armyIdNumber
    } = req.body

    if (email && name && phone && armyIdNumber) {
        const details = {
            email,
            name,
            phone,
            armyIdNumber
        }
        const isExists = await isArmyIdExists(armyIdNumber);
        if (isExists)
            res.send('army id already exists')
        else {
            const id = await addOfficer(details)
            res.redirect('/officers?id=' + id)
        }
    }
    else {
        res.json({ messgae: 'make sure you have all the fields needed', success: false })
    }
})

export default router