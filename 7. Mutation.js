'use strict';

const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
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


const { getVideoByID, getVideos, createVideo } = require('./src/data/getVideoByID');

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
        videos: {
            type: new GraphQLList(videoType),
            resolve: getVideos,
        },
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
});
// -->Create: new entry 
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: "The root moot",
    fields: {
        createVideo: {
            type: videoType,
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The title of x'
                },
                duration: {
                    type: new GraphQLNonNull(GraphQLInt),
                    description: 'The duration of x'
                },
                released: {
                    type: new GraphQLNonNull(GraphQLBoolean),
                    description: 'The released of x'
                }
            },
            resolve: (_, args) => {
                return createVideo(args);
            }
        }
    }
})
const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
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