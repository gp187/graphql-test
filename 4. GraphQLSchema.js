'use strict';

const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const PORT = process.env.PORT || 3000;
const server = express();

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
            resolve: () => new Promise((res) => {
                res({
                    id: 'a',
                    title:"something",
                    duration: 240,
                    watched: false
                })
            })
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