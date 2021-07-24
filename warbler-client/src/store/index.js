import rootReducer from "./reducers"; // same thing as './reducers/index';
import { createStore, applyMiddleware, compose } from "redux";  // compose allows us to combine functions together & applyMiddleware for applying middlware like thunk
import thunk from "redux-thunk";  // allows us to delay the evaluation of some expression, essential for async code in redux

export function configureStore(){
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}
