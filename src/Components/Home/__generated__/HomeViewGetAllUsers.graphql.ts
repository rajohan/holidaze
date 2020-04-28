/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeViewGetAllUsers = {
    readonly username: string;
    readonly id: string;
    readonly " $refType": "HomeViewGetAllUsers";
};
export type HomeViewGetAllUsers$data = HomeViewGetAllUsers;
export type HomeViewGetAllUsers$key = {
    readonly " $data"?: HomeViewGetAllUsers$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeViewGetAllUsers">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "HomeViewGetAllUsers",
  "type": "UserType",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "username",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '8f09d9d0e0cde81c439d08ec4c309bf9';
export default node;
