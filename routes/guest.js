const _ = require('lodash');
const { checkSchema, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

const CONFIG = require('../lib/config');
const guestModel = require('../model/Guest');

router.post('/guest', checkSchema(CONFIG.API.registGuest), async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const options = {
        name: req.body.name,
        mobile: req.body.mobile
    };
    try {
        const result = await guestModel.create(options);
        res.status(200).json(_.pick(result, ['customId', 'name', 'mobile', 'createdAt', 'updatedAt']));
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

router.get('/guest/:id', checkSchema(CONFIG.API.getGuestInfo), async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = _.toInteger(req.params.id);
    // const guestInfo = await guestModel.getGuestInfoByCustomId(id);
    const guestInfo = await guestModel.findOne(
        {customId: id},
        (err, guest) => {
            if (err) {
                return handleError(err);
            }
        }
    )
    console.log(guestInfo);

    res.status(200).json({ guestInfo: guestInfo});
})
module.exports = router;