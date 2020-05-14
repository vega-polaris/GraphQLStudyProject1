const express = require('express');
// by convention, the capitalization is GraphQL, not graphQl or graphQL or anything else.
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
// this line is added after we've created (and exported) our schema in the schema file.

const app = express();

const PORT = 4000;

// since we've imported the compatibility layer expressGraphQL, we tell express that if any request comes in with a GraphQL piece, we want GraphQL to handle it:

app.use(
    '/graphql',
    expressGraphQL(
        // the object below is the options object of the GraphQL middleware. If you run the server with just 'graphiql: true' in this object, you'll get an error: "GraphQL middleware options must contain a schema." This refers to how GraphQL views all of our data as a graph. We need to inform GraphQL about the type of data we're working with, and how the relations between the different pieces of data work. This is done in a separate folder - see "schema".
        {
            schema,
            // line added after creating schema in the schema file
            graphiql: true
            // graphiql is a dev tool that allows us to make queries against our dev server, so only for a dev environment
        }
    )
);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

/*
When wiring up graphQL, there's another step inside the express server: a check whether or not the HTTP request that the express server is fielding is making any use of GraphQL. If yes, server sends the request to GraphQL to handle. GraphQL sends data back to express, and express sends it back to client.

So the express server can have anything it could normally have. GraphQL doesn't override anything, it's just an additional piece of the process.
*/
