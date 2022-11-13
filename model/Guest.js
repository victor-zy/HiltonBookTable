/**
 * @description 客人信息表
 * @param {Integer} id 
 * @param {String} name
 * @param {String} mobile
 * @param {Date} createdAt
 * @param {Date} updatedAt
 */

const mongoose = require('mongoose');
let counter = 100000;
const Guest = new mongoose.Schema({
    id: { required: true,type: Number,default: () => counter++ },
    name: { required: false,type: String },
    mobile: { type: String },
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Guest', Guest);