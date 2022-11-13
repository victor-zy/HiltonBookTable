/**
 * @description 桌子信息
 * @param {Integer} id 
 * @param {Boolean} isBooked
 * @param {Object} sizeInfo
 * @param {Date} createdAt
 * @param {Date} updatedAt
 */
let counter = 100;
const Tables = new mongoose.Schema({
    id: {type: Number, required: true, default: () => counter++},
    isBooked: {type: Boolean, required: true},
    sizeInfo: {
        type: String,
        get: (v) => JSON.parse(v),
        set: (v) => JSON.stringify(v),
        required: true
    },
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});
module.exports = mongoose.model('Tables', Tables);