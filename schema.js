const { makeExecutableSchema } = require( '@graphql-tools/schema');
const {mergeTypeDefs, mergeResolvers, } = require( '@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './typeDefs'), {all: true}));

const resolvers = mergeResolvers(loadFilesSync('../resolvers'));

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers,
});