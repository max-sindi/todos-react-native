import {types} from './searchActions'

const initialState = {
  searchString: '',
}

export default (state = initialState, action) => {
  const {type, payload} = action

  const availableMutations = {
    [types.SEARCH_CHANGE_STRING]: () => ({...state, searchString: payload}),
    [types.SEARCH_CLEAR_STRING]: () => ({...state, searchString: ''}),
  }

  const matchedAction = availableMutations[type]

  if(matchedAction) {
    return matchedAction()
  } else {
    return state
  }
}