import {graphql} from "@octokit/graphql/dist-types/types";

export async function getFlowDescriptors(connection: graphql, owner: string, repoName: string) {

    const repository = await connection(
        `query getFDs($owner: String!, $name: String!) {
                    repository(owner: $owner, name: $name ) {
                        object(expression: "HEAD:resources/architecture_flows/sequence/") {
                          ... on Tree {
                            entries {
                              name
                              type
                              mode
                              path

                              object {
                                ... on Blob {
                                  byteSize
                                  text
                                  isBinary
                                }
                              }
                            }
                          }
                        }
                    }
                }`,
        {owner: owner, name: repoName},
    );
    return repository;
}

export async function getFlowDescriptor(connection: graphql, owner:string, repoName: string, path: string) {
    const repository = await connection(

        `query getFD($owner: String!, $name: String!, $expression: String!) {
                    repository(owner: $owner, name: $name) {
                        object(expression: $expression) {
                          ... on Blob {
                            byteSize
                            text
                            isBinary
                          }
                        }
                    }
                }`,
        {owner: owner, name: repoName, expression: `HEAD:${path}`},
    );
    return repository;

}
