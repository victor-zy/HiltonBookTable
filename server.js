const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const _ = require('lodash');

const config = require('./lib/config');
const indexRouter = require('./routes/index');
const guestRouter = require('./routes/guest');
const restaurantsModel = require('./model/RestaurantsModel');
const employeesModel = require('./model/Employees');
const logModel = require('./model/Log');
const guestModel = require('./model/Guest');
const tableModel = require('./model/Tables');

const mongooseUrl = config.database.mongodbUrl;
mongoose.connect(mongooseUrl);
const database = mongoose.connection;
database.on('error', (error) => { console.log(error); });
database.once('connected', () => { console.log('database connection'); });


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());


const schema = buildSchema(`
type Reservation {
    bookId: ID!,
    tableId: ID,
    guestId: ID,
    bookAt: String,
    arrivalAt: String,
    isUsed: Boolean,
    isCanceled: Boolean,
    createdAt: String,
    updatedAt: String
}

type Employee {
    employeeId: Int!,
    name: String,
    password: String,
    createdAt: String,
    updatedAt: String,
}

type Guest {
    customerId: Int!,
    name: String,
    mobile: String,
    createdAt: String,
    updatedAt: String
}

type Log {
    operationId: Int!,
    action: String,
    bookId: Int,
    operation: String,
    createdAt: String,
    updatedAt: String,
}

type Table {
    tableId: Int!,
    isBooked: Boolean,
    sizeInfo: String,
    createdAt: String,
    updatedAt: String,
}

input Options  {
    bookId: ID,
    bookAt: TimeArea, 
    isUsed: Boolean, 
    isCanceled: Boolean
}

input TimeArea {
    startedAt: String,
    endedAt: String,
}

type Query {
    # 获取订单信息
    getReservations(params: Options): [Reservation],
}

type Mutation {
    createReservation(tableId: ID, guestId: ID, bookAt: String, arrivalAt: String, isUsed: Boolean, isCanceled: Boolean): Reservation,
    updateReservation(tableId: ID, guestId: ID, bookAt: String, arrivalAt: String, isUsed: Boolean, isCanceled: Boolean): Reservation,
}
`);

const rootValue = {
    /**
     * @description 获取订单信息：按照：订单ID，预定日期和状态
     * @param {Object} options
     * @param {Integer} options.bookId 订单ID
     * @param {String} options.booAt 预定时间
     * @param {Boolean} options.isUsed 是否使用
     * @param {Boolean} options.isCanceled 是否取消
     * @returns {Array} [Reservation]
     */
    getReservations: async (options) => {
        const {bookId, bookAt, isUsed, isCanceled}  = options.params;
        const pickParams = ['bookId', 'tableId', 'bookAt', 'isUsed', 'isCanceled', 'arrivalAt'];
        const reservations = [];
        if (bookId) {
            const reservation = await restaurantsModel.findOne({bookId: bookId});
            
            const info = _.pick(reservation, pickParams);
            reservations.push(info);
        } else if (bookAt) {
            const info = _.pick(await reservationsModel.findOne({bookAt: {$in: [bookAt.startedAt, bookAt.endedAt]}}), pickParams);
            reservations.push(info);
        } else if (isUsed) {
            // TODO: 使用预约的客户
        } else if (isCanceled) {
            // TODO: 取消预约的客户
        }
        return reservations;
    },

    /**
     * @description 创建预约订单信息
     * @param {Object} options 
     * @returns 
     */
    createReservation: async function(options) {
        const result = await restaurantsModel.create(options);
        return result;
    },

    /**
     * @description 创建员工
     * @param {Object} options 
     * @returns 
     */
    createEmployee: async function(options) {
        const employee = await employeesModel.create(options);
        return employee;
    },

    /**
     * @description 根据预约订单ID更新预约信息
     * @param {Object} options 
     * @returns 
     */
    updateReservation: async function(options) {
        const result = await restaurantsModel.update({bookId: options.bookId},options);
        return result;
    },

    /**
     * @description 创建预约订单操作记录
     * @param {} options 
     * @returns 
     */
    createLog: async (options) => {
        const result = await logModel.create(options);
        return result;
    },

    /**
     * @description 客户注册
     * @param {*} options 
     * @returns 
     */
    createGuest: async (options) => {
        const result = await guestModel.create(options);
        return result;
    },

    /**
     * @description 新加桌子
     * @param {*} options 
     * @returns 
     */
    createTable: async (options) => {
        const result = await tableModel.create(options);
        return result;
    }
};


app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

app.use('/api', indexRouter);
app.use('/custom', guestRouter);


app.listen(config.port || 3000, () => {
    console.log(`Server started at ${config.port}`);
});