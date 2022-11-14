const restaurantsModel = require('../model/RestaurantsModel');

module.exports = {
    Query: {
        getReservations: async (bookId) => {
            const result = await restaurantsModel.findById('636f3c9fb4904c34f6281d02');
            return result;
        },
    },

    Mutation: {
        createReservation: async (options) => {
            const result = await restaurantsModel.create(options);
            return result;
        },
    }
};