import React from 'react'
import {initStore} from "../../../src/client/store";
import {Provider} from "react-redux";
import {CartApi, ExampleApi} from "../../../src/client/api";
import {Store} from "redux";

export const basenameTest = '/hw/store';
const api = new ExampleApi(basenameTest);
const cart = new CartApi();
const store = initStore(api, cart);

export function ReduxWrapper(innerStore: Store = store) {
    return function (component: JSX.Element) {
        return (
            <Provider store={innerStore}>
                {component}
            </Provider>
        )
    }
}
