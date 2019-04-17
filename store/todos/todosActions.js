export const types = {
  FETCH_TODOS: 'FETCH_TODOS',
  FETCH_TODO_SINGLE: 'FETCH_TODO_SINGLE',
  DELETE_TODO_SIGNLE: 'DELETE_TODO_SIGNLE',
  UPDATE_TODO_SINGLE: 'UPDATE_TODO_SINGLE',
  CREATE_NEW_TODO: 'CREATE_NEW_TODO',
}

export const fetchTodos = (params = {}) => ({
  type: types.FETCH_TODOS,
  request: {
    url: '/todos/',
    params,
  }
})

export const fetchTodoById = id => ({
  type: types.FETCH_TODO_SINGLE,
  request: {
    url: `/todos/${id}/`
  }
})

export const updateTodoById = (id, data) => ({
  type: types.UPDATE_TODO_SINGLE,
  request: {
    url: `/todos/${id}/`,
    method: 'put',
    data,
  },
  meta: {
    asPromise: true,
  }
})

export const deleteTodoById = (id, index) => ({
  type: types.DELETE_TODO_SIGNLE,
  request: {
    url: `/todos/${id}/`,
    method: 'delete'
  },
  meta: {
    asPromise: true,
    index,
  }
})

export const createNewTodo = todoData => ({
  type: types.CREATE_NEW_TODO,
  request: {
    url: '/todos/',
    method: 'post',
    data: todoData
  },
  meta: {
    asPromise: true,
  }
})

export const fetchTodosWithFiltersAndSearch = () => (dispatch, getState) => {
  const state = getState()
  const {searchString} = state.search
  const {filterByDone} = state.todosFilters
  // 'q' means full-text search, https://github.com/typicode/json-server#full-text-search
  const searchParams = searchString ? {q: searchString} : null
  const filterByDoneParams = filterByDone ? {isDone: filterByDone} : null

  dispatch(fetchTodos({...searchParams, ...filterByDoneParams}))
}
