import {types} from "./todosFiltersActions"

const initialState = {
  filterByDone: ''
}

export default (state = initialState, action) => {
  const {type, payload} = action

  const availableMutations = {
    [types.TODOS_FILTERS_CHANGE_BY_DONE]: () => ({...state, filterByDone: payload}),
    [types.TODOS_FILTERS_RESET]: () => initialState
  }

  const matchedAction = availableMutations[type]

  if(matchedAction) {
    return matchedAction()
  } else {
    return state
  }
}