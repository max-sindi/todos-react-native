import {combineReducers} from "redux"
import {todos, todo}from "./todos/todosReducer"
import search from "./search/searchReducer"
import todosFilters from "./todosFilters/todosFiltersReducer"
import auth from "./auth/reducer"

const reducers = combineReducers({
  todos,
  todo,
  search,
  todosFilters,
  auth,
})

export default reducers