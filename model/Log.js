/**
 * @description 操作记录
 * @param {Integer} operationId 
 * @param {String} action 'book - update - cancel'
 * @param {String} bookId 预定id
 * @param {String} operation 操作人员信息'operator|operatorId --> guest|123 --> employee|123'
 * @param {Date} createdAt
 * @param {Date} updatedAt
 */
let counter = 0;
const Log = new mongoose.Schema({
    operationId: {type: Number, required: true, default: () => counter++},
    action: {type: String, required: true, enum: ['book', 'update', 'cancel']},
    bookId: {type: Number, required: true, min: 1},
    operation: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});

exports.classMethods = {
    create: async function(options) {
        const data = await Log.save(options);
        return data.toJSON();
    },
};
module.exports = mongoose.model('Log', Log);