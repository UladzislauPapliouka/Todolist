import {RootState} from "../Store";

const isLoggedInSelector = (state:RootState) => state.auth.isLoggedIn

export{isLoggedInSelector}