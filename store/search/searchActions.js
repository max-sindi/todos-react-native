export const types = {
  SEARCH_CHANGE_STRING: 'SEARCH_CHANGE_STRING',
  SEARCH_CLEAR_STRING: 'SEARCH_CLEAR_STRING',
}

export const changeSearchString = value => ({
  type: types.SEARCH_CHANGE_STRING,
  payload: value,
})

export const clearSearchString = () => ({type: types.SEARCH_CLEAR_STRING})