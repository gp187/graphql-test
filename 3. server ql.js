'use strict';

const { graphql, buildSchema } = require('graphql');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const PORT = process.env.PORT || 3000;
const server = express();


// -->Create: document schema
const schema = buildSchema(`
type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
}
type Query {
    video: Video
    videos: [Video]
}
type Schema {
    query: Query
}
`);

// -->Define: resolvers 
const resolvers = {
    video: () => ({
        id: () => '1',
        title: () => 'bar',
        duration: () => 180,
        watched: () => true,
    }),
    videos: () => videos
};
const videoA = {
    id: 'a',
    title: 'A',
    duration: 180,
    watched: true
}
const videoB = {
    id: 'b',
    title: 'B',
    duration: 240,
    watched: false
}

const videos = [videoA, videoB];



// -->Run: server and routes
server.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true,
    rootValue: resolvers // how to fetch the fields
}));

server.listen(PORT, () => {
    console.log('listening... ')
})

// -->Goto: port 3000/graphql and use query interface for testing