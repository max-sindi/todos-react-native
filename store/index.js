import {compose, applyMiddleware, createStore} from "redux"
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"
import createSaga from 'redux-saga'
import rootSaga from './saga'
import combinedReducers from "./reducers"
import { requestsPromiseMiddleware } from 'redux-saga-requests'

const logger = createLogger({
    diff: true,
    collapsed: true,
    actionTransformer: (action = {}) => {
        if (action && action.payload) {
            action.payload = omit(action.payload, ['request']);
        }
        return action;
    }
})
const saga = createSaga()

const store = createStore(
  combinedReducers,
  undefined,
  compose(
    applyMiddleware( thunk, requestsPromiseMiddleware(), saga),
  )
)

saga.run(rootSaga)

export default store