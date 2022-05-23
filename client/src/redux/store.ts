import { legacy_createStore as createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import rootReducer from "./reducers/index";

import { composeWithDevTools } from "redux-devtools-extension";

import { useDispatch } from "react-redux";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
