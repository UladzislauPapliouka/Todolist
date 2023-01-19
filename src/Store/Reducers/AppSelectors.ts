import {RootState} from "../Store";

const selectAppStatus = (state: RootState) => state.app.status
const selectAppIsInitialized = (state: RootState) => state.app.isInitialized
const selectAppError = (state: RootState) => state.app.error

export {selectAppIsInitialized, selectAppStatus, selectAppError}