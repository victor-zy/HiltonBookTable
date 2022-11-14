const { checkSchema, validationResult } = require('express-validator');

const express = require('express');
const router = express.Router();

const RestaurantsModel = require('../model/RestaurantsModel');
const CONFIG = require('../lib/config');

const errorReturn = function (req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}

router.get('/test', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 * @description 创建一笔预定定单
 */
router.post('/reservations', checkSchema(CONFIG.API.createReservations), async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    const data = new RestaurantsModel({
        tableId: body.tableId,
        guestId: body.guestId,
        bookAt: body.bookAt,
        arrivalAt: body.arrivalAt,
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/reservations/:ids', checkSchema(CONFIG.API.getReservations), async function (req, res) {
    console.log(req.params.ids);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.status(200).json({ message: 'OK' });
});
module.exports = router;