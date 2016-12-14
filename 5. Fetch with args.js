'use strict';

const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const PORT = process.env.PORT || 3000;
const server = express();


const { getVideoByID } = require('./src/data/getVideoByID');

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: "eggi",
    fields: {
        id: {
            type: GraphQLID,
            description: 'the id of the video'
        },
        title: {
            type: GraphQLString,
            description: 'title of the video '
        },
        duration: {
            type: GraphQLInt,
            description: "duratioon in secs"
        },
        watched: {
            type: GraphQLBoolean,
            description: "did he watch or neah"
        }
    }
})
const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'the root q type',
    fields: {
        video: {
            type: videoType,
            args: {// using args for multi values
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'id of video'
                }
            },
            resolve: (_, args) => {
                return getVideoByID(args.id)
            }
        }
    }
})
const schema = new GraphQLSchema({
    query: queryType
})




// -->Run: server and routes
server.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}));

server.listen(PORT, () => {
    console.log('listening... ')
})

// -->Goto: port 3000/graphql and use query interface for testing