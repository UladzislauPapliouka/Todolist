import React from "react"
import App from "./App"
import {Provider} from "react-redux";
import {Store} from "./Store/Store";
import {ReduxStoreProviderDecorator} from "../.storybook/ReduxStoreProviderDecorator";

export default {
    title: "App",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppBase = () => {
    return (
        <App />
    )
}