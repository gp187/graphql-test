'use strict';

const { graphql, buildSchema } = require('graphql');

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



// -->Write: query
const query = `
query myFirstQuery {
    videos {
        id,
        title,
        duration,
        watched
    }
}
`;


// -->Run: the ql 
graphql(schema, query, resolvers)
    .then((res) => console.log(res))
    .catch((err) => console.error(err))