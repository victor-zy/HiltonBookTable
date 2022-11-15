const restaurantsModel = require('../model/RestaurantsModel');
const employeesModel = require('../model/Employees');
const logModel = require('../model/Log');
const guestModel = require('../model/Guest');
const tableModel = require('../model/Tables');

module.exports = {
    Query: {
        getReservations: async (bookId,) => {
            
            const result = await restaurantsModel.findById(bookId);
            return ['l;kl;l;kl;'];
        },
    },

    Mutation: {
        createReservation: async (options) => {
            const result = await restaurantsModel.create(options);
            return result;
        },
        createEmployee: async (options) => {
            const employee = await employeesModel.create(options);
            return employee;
        },
        updateReservation: async (options) => {
            const result = await restaurantsModel.update({bookId: options.bookId},options);
            return result;
        },
        createLogin: async (options) => {
            const result = await logModel.create(options);
            return result;
        },
        createGuest: async (options) => {
            const result = await guestModel.create(options);
            return result;
        },
        createTable: async (options) => {
            const result = await tableModel.create(options);
            return result;
        }
    }
};