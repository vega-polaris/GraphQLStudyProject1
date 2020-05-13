// GraphQL schema looks exactly like the schema I'm used to, tables connected via common properties (foreign keys). We need to communicate to GraphQL exactly what our data looks like.
const graphql = require('graphql');

const {
    GraphQLObjectType,
    // used to instruct GraphQL about the idea of a user, who has an ID and a first-name property.
    GraphQLInt,
    GraphQLString
    // those are GraphQL data types - see them applied in the object passed into the User Type schema.
} = graphql;

const UserType = new GraphQLObjectType({
    // the object we pass has two required properties:
    name: 'User',
    // name refers to the type that we're defining here. Usually equal to whatever you call this type. Always a string, and by convention in Title Case.
    fields: {
        // this is the most important property. It tells GraphQL about the different properties the user has. The keys here are a user's properties.
        // we have to tell GraphQL what types of data each property is. This is why each property's value is an object with one key "type".
        id: { type: GraphQLString },
        // we can't just tell GraphQL "this is a string". This is why we use built-in GraphQL types.
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

// Root Query - because GraphQL is, well, a graph, there's no clear entry point to the data. The Root Query allows us to jump into the graph from a specific point; this is the place that has logic to find our first node.
const RootQuery = new GraphQLObjectType({
    // it's an object exactly like the previous one, so it has to have both of the mandatory properties:
    name: 'RootQueryType',
    fields: {
        user: {
            // "you can ask me about users in this application."
            // if you give me the ID of the user you're looking for - which is a string - I will return a user back to you.
            type: UserType,
            args: { id: { type: GraphQLString } },
            // specifies arguments that are required for the root query - i.e., if you're looking for a user, you have to give me the ID.
            resolve(parentValue, args) {
                // THE MOST IMPORTANT PART
                // purpose: oh, you're looking for auser with ID 23? I'll do my best to find it.
                // this is where we actually go into our DB and find the data we're looking for. Everything we've added here so far tells us what the data looks like; the resolve func is to reach out and grab that data.
                // parentValue is notorious for not really ever being used
                // the second argument (args) gets called with whatever args were passed into the original query. If our query expects to be provided with the ID of the user we're trying to fetch, that ID will be present in the args object.
            }
        }
    }
});
