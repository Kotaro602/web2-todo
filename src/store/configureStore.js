import {createStore,  applyMiddleware} from 'redux';
import Immutable from 'immutable';
import rootReducer from '../reducers/r-root';
import createSagaMiddleware from "redux-saga";
import createLogger from 'redux-logger';
import rootSaga from "../sagas";

export default function configureStore() {

   const logger =  createLogger({
      collapsed: true,
      stateTransformer: state => state.toJS()
   });

   const sagaMiddleware = createSagaMiddleware();

   let store;
   // if (process.env.NODE_ENV === `production`) {
   //     store = createStore(
   //       rootReducer,
   //       Immutable.fromJS({}),
   //       applyMiddleware(sagaMiddleware)
   //    )
   // }else{
      store = createStore(
         rootReducer,
         Immutable.fromJS({}),
         applyMiddleware(sagaMiddleware, logger)
      );
   //}
   sagaMiddleware.run(rootSaga);

   return store;
}