/**
 * @description 预定信息记录表
 * @param {Integer} bookId 
 * @param {String} tableId
 * @param {String} guestId
 * @param {Date} bookedAt
 * @param {Date} arrivalAt
 * @param {Boolean} isUsed
 * @param {Boolean} isCanceled
 * @param {Date} createdAt
 * @param {Date} updatedAt
 */
const mongoose = require('mongoose');

let counter = 1;
const Reservations = new mongoose.Schema({
    bookId: { type: Number, default: () => counter++ },
    tableId: { type: Number, required: true, min: 100 },
    guestId: { type: Number, required: true, min: 100000 },
    bookAt: { type: Date },
    arrivalAt: { type: Date },
    isUsed: { type: Boolean },
    isCanceled: { type: Boolean },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Reservations', Reservations);