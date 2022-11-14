/**
 * @description 客人信息表
 * @param {Integer} customId 
 * @param {String} name
 * @param {String} mobile
 * @param {Date} createdAt
 * @param {Date} updatedAt
 */

const mongoose = require('mongoose');
let counter = 100000;
const Guest = new mongoose.Schema({
    customId: { required: true, type: Number, default: () => counter++ },
    name: { required: false, type: String },
    mobile: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
});

// const classMethods = {
//     /**
//      * @description 注册新的顾客
//      * @param {Object} options 
//      * @returns 
//      */
//     create: async function(options) {
//         const data = await Guest.save(options);
//         return data.toJSON();
//     },
// };

// /**
//  * @description 通过顾客Id获取顾客信息
//  * @param {Integer} customId 顾客ID
//  */
// const getGuestInfoByCustomId = async function(customId) {
//     const info = await GuestModel.findOne(
//         {customId: customId},
//         (err, guest) => {
//             if (err) {
//                 return handleError(err);
//             }
//         }
//     ).exec(callback);
//     console.log(info);
//     return info;
// }

module.exports = mongoose.model('Guest', Guest);