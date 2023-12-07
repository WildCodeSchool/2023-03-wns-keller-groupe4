import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://backend:4000/graphql",
    documents: ["./src/utils/queries.ts", "./src/utils/mutations.ts"],
    generates: {
        "./src/__generated__/": {
            preset: "client",
            plugins: [],
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
