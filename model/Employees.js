/**
 * @description 管理人员信息
 * @param {Integer} employeeId 
 * @param {String} name
 * @param {String} password
 * @param {Date} createdAt
 * @param {Date} updatedAt
 */


const mongoose = require('mongoose');
let counter = 100000;
const Employee = new mongoose.Schema({
    employeeId: {type: Number, required: true, default: () => counter++},
    name: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Employee', Employee);