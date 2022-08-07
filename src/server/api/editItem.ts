import express from 'express'
const router = express.Router()
import { isOfficerExists, isLocationExists, isSockExists, isHistoryExists, editOfficer, editHistory, editLocation, editSock } from '../db'



router.post('/sock/:id', async (req, res) => {
    const {
        model,
        officerId,
        quantity,
        size,
        year,
        locationId,
    } = req.body
    console.log(req.body);

    const id = Number(req.params.id)

    if (model && officerId && quantity && size && year && locationId) {
        const isExists = isSockExists(id)
        if (isExists) {
            editSock(id, {
                model,
                officerId,
                quantity,
                size,
                year,
                locationId,
            }).then(data => {
                res
                    // .json({ success: true, officer: data.rows[0] })
                    .redirect('/edit/sock/' + id)
            })
        } else {
            res.json({ success: false, message: "this sock doesnt exists" })
        }
    } else {
        res.json({
            message: 'make sure to send all the necessary fields' + JSON.stringify({
                model,
                officerId,
                quantity,
                size,
                year,
                locationId
            }), success: false
        })
    }
})
router.post('/location/:id', async (req, res) => {
    const {
        city,
        base,
        lon,
        lat
    } = req.body
    const id = Number(req.params.id)

    if (city && base && lon && lat) {
        const isExists = isLocationExists(id)
        if (isExists) {
            editLocation(id, {
                nearestCity: city,
                baseName: base,
                lon,
                lat
            }).then(data => {
                res
                    // .json({ success: true, officer: data.rows[0] })
                    .redirect('/edit/location/' + id)
            })
        }
        else {
            res.json({ success: false, message: "this location doesnt exists" })
        }
    } else {
        res.json({ message: 'make sure you have all the necessary fields', success: false })
    }
})
router.post('/history/:id', async (req, res) => {
    const {
        arrivalDate,
        departureDate,
        locationId,
        sockId
    } = req.body
    const id = Number(req.params.id)

    if (arrivalDate && departureDate && locationId && sockId && id) {
        const [isExist, isSExists,
            isLExists] = await Promise.all([isHistoryExists(id), isSockExists(sockId), isLocationExists(locationId)])

        if (isExist && isSExists && isLExists) {
            editHistory(id, {
                arrivalDate,
                departureDate,
                locationId,
                sockId
            }).then(data => {
                res
                    // .json({ success: true, officer: data.rows[0] })
                    .redirect('/edit/history/' + id)
            })
        }
        else {
            res.json({ message: 'history/location/sock do not exist', success: false })
        }

    } else {
        res.send({ message: 'make sure to fill all the necessary fields', success: false })
    }

})
router.post('/officer/:id', async (req, res) => {
    const {
        email,
        name,
        phone,
        armyIdNumber
    } = req.body
    const id = Number(req.params.id)

    if (email && name && phone && armyIdNumber) {
        const details = {
            email,
            name,
            phone,
            armyIdNumber
        }
        const isExists = await isOfficerExists(id);
        if (isExists) {
            editOfficer(id, {
                email,
                name,
                phone,
                armyIdNumber
            }).then(data => {
                res
                    // .json({ success: true, officer: data.rows[0] })
                    .redirect('/edit/officer/' + id)
            })
        }
        else {
            res.json({ message: 'this officer does not exists', success: false })
        }
    }
    else {
        res.json({ messgae: 'make sure you have all the fields needed', success: false })
    }
})

export default router