import React from 'react';
import * as H from 'history';

import {RouterWrapper} from './RouterWrapper';
import {ReduxWrapper} from "./ReduxWrapper";
import {Store} from "redux";

type WrapperOptions = Partial<{
    route: string,
    store?: Store,
    routerEntries: H.LocationDescriptor[],
    additionalWrappers: ((component: React.JSX.Element) => React.JSX.Element)[],
}>

export function createWrapper({
                                  route = '/',
                                  store,
                                  routerEntries = ['/'],
                                  additionalWrappers = [],
                              }: WrapperOptions): React.JSXElementConstructor<{children: React.ReactElement}> {
    return ({children}) => {
        const wrappers = [
            RouterWrapper(route, routerEntries),
            ReduxWrapper(store),
            ...additionalWrappers,
        ];

        let component = children;
        for (const wrapper of wrappers) {
            component = wrapper(component);
        }
        return component;
    };
}
