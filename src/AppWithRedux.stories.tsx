import React from "react"
import App from "./App"
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