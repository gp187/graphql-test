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
    })
};

// -->Write: query
const query = `
query myFirstQuery {
    video {
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