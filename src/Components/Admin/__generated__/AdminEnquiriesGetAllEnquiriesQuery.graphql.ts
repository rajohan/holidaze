/* tslint:disable */
/* eslint-disable */
/* @relayHash ca9fb9a8270617de70727bc51a79e795 */

import { ConcreteRequest } from "relay-runtime";
export type AdminEnquiriesGetAllEnquiriesQueryVariables = {};
export type AdminEnquiriesGetAllEnquiriesQueryResponse = {
    readonly getAllEnquiries: ReadonlyArray<{
        readonly id: string;
        readonly clientName: string;
        readonly email: string;
        readonly checkin: unknown;
        readonly checkout: unknown;
        readonly establishment: {
            readonly id: string;
            readonly name: string;
        };
    }>;
};
export type AdminEnquiriesGetAllEnquiriesQuery = {
    readonly response: AdminEnquiriesGetAllEnquiriesQueryResponse;
    readonly variables: AdminEnquiriesGetAllEnquiriesQueryVariables;
};

/*
query AdminEnquiriesGetAllEnquiriesQuery {
  getAllEnquiries(withEstablishment: true) {
    id
    clientName
    email
    checkin
    checkout
    establishment {
      id
      name
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = {
            kind: "ScalarField",
            alias: null,
            name: "id",
            args: null,
            storageKey: null
        },
        v1 = [
            {
                kind: "LinkedField",
                alias: null,
                name: "getAllEnquiries",
                storageKey: "getAllEnquiries(withEstablishment:true)",
                args: [
                    {
                        kind: "Literal",
                        name: "withEstablishment",
                        value: true
                    }
                ],
                concreteType: "EnquiryType",
                plural: true,
                selections: [
                    v0 /*: any*/,
                    {
                        kind: "ScalarField",
                        alias: null,
                        name: "clientName",
                        args: null,
                        storageKey: null
                    },
                    {
                        kind: "ScalarField",
                        alias: null,
                        name: "email",
                        args: null,
                        storageKey: null
                    },
                    {
                        kind: "ScalarField",
                        alias: null,
                        name: "checkin",
                        args: null,
                        storageKey: null
                    },
                    {
                        kind: "ScalarField",
                        alias: null,
                        name: "checkout",
                        args: null,
                        storageKey: null
                    },
                    {
                        kind: "LinkedField",
                        alias: null,
                        name: "establishment",
                        storageKey: null,
                        args: null,
                        concreteType: "EstablishmentType",
                        plural: false,
                        selections: [
                            v0 /*: any*/,
                            {
                                kind: "ScalarField",
                                alias: null,
                                name: "name",
                                args: null,
                                storageKey: null
                            }
                        ]
                    }
                ]
            }
        ];
    return {
        kind: "Request",
        fragment: {
            kind: "Fragment",
            name: "AdminEnquiriesGetAllEnquiriesQuery",
            type: "Query",
            metadata: null,
            argumentDefinitions: [],
            selections: v1 /*: any*/
        },
        operation: {
            kind: "Operation",
            name: "AdminEnquiriesGetAllEnquiriesQuery",
            argumentDefinitions: [],
            selections: v1 /*: any*/
        },
        params: {
            operationKind: "query",
            name: "AdminEnquiriesGetAllEnquiriesQuery",
            id: null,
            text:
                "query AdminEnquiriesGetAllEnquiriesQuery {\n  getAllEnquiries(withEstablishment: true) {\n    id\n    clientName\n    email\n    checkin\n    checkout\n    establishment {\n      id\n      name\n    }\n  }\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "394474e831989504a655d05b6fbe088e";
export default node;
