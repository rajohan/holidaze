/* tslint:disable */
/* eslint-disable */
/* @relayHash 7a68d056237bc15937fbae5ec433d606 */

import { ConcreteRequest } from "relay-runtime";
export type AppRefreshAuthTokensMutationVariables = {};
export type AppRefreshAuthTokensMutationResponse = {
    readonly refreshAuthTokens: {
        readonly authToken: string;
    };
};
export type AppRefreshAuthTokensMutation = {
    readonly response: AppRefreshAuthTokensMutationResponse;
    readonly variables: AppRefreshAuthTokensMutationVariables;
};

/*
mutation AppRefreshAuthTokensMutation {
  refreshAuthTokens {
    authToken
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        {
            kind: "LinkedField",
            alias: null,
            name: "refreshAuthTokens",
            storageKey: null,
            args: null,
            concreteType: "TokenType",
            plural: false,
            selections: [
                {
                    kind: "ScalarField",
                    alias: null,
                    name: "authToken",
                    args: null,
                    storageKey: null
                }
            ]
        }
    ];
    return {
        kind: "Request",
        fragment: {
            kind: "Fragment",
            name: "AppRefreshAuthTokensMutation",
            type: "Mutation",
            metadata: null,
            argumentDefinitions: [],
            selections: v0 /*: any*/
        },
        operation: {
            kind: "Operation",
            name: "AppRefreshAuthTokensMutation",
            argumentDefinitions: [],
            selections: v0 /*: any*/
        },
        params: {
            operationKind: "mutation",
            name: "AppRefreshAuthTokensMutation",
            id: null,
            text: "mutation AppRefreshAuthTokensMutation {\n  refreshAuthTokens {\n    authToken\n  }\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "64afd23221b14bdb659f751b98f99cd6";
export default node;
