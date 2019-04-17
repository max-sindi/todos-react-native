export const types = {
  TODOS_FILTERS_CHANGE_BY_DONE: 'TODOS_FILTERS_CHANGE_BY_DONE',
  TODOS_FILTERS_RESET: 'TODOS_FILTERS_RESET',
}

// @param newFilterValue - String - name of field in filtersVariations object, which u can find in reducer
export const changeFilterByDone = (newFilterValue) => ({
  type: types.TODOS_FILTERS_CHANGE_BY_DONE,
  payload: newFilterValue
})

export const clearFilter = () => ({type: types.TODOS_FILTERS_RESET})