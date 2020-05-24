module.exports = {
    client: {
        service: {
            name: "Holidaze API",
            localSchemaFile: ["./src/GraphQL/schema.graphql", "./src/GraphQL/localSchema.graphql"]
        },
        includes: ["./src/**/*.ts", "./src/**/*.tsx"]
    }
};
