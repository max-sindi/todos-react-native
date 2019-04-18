import React from 'react'
import {NavigationEvents, withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import {fetchTodosWithFiltersAndSearch} from '../store/todos/todosActions'
import {changeSearchString, clearSearchString} from '../store/search/searchActions'
import {Ionicons} from '@expo/vector-icons'
import {Button} from 'react-native-elements'
import {input} from './Todo'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ScrollView,
  EditTodo,
  TouchableOpacity,
  TextInput,
} from 'react-native'


/***
 * LIST ITEM
 * ***/
let TodoItem = function({ item, navigation }) {
  function navigateToTodo() {
    navigation.navigate('EditTodo', {id: item.id})
  }

  return (
      <TouchableOpacity style={styles.itemContainer} onPress={navigateToTodo}>
          <View>
              <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
          <View style={{maxHeight: 60}}>
              <Text style={styles.itemBody}>{item.body}</Text>
          </View>
          {/* arrow */}
          {/*<Transforms>*/}
            <View style={styles.arrowContainer}>
              <Ionicons name={'md-arrow-forward'} size={20}/>
            </View>
          {/*</Transforms>*/}
      </TouchableOpacity>
  )
}

TodoItem = withNavigation(TodoItem)

/***
 * LIST RENDERING
 * ***/
const TodoList = function({items}) {
  return (
    <View>
        {items.length === 0 ?
          <Text style={styles.emptyListMessage}>The list is empty.</Text> :
          items.map((item) => <TodoItem key={item.id} item={item}/>)
        }
    </View>
  )
}

/***
 * SEARCH
 * ***/
let Search = function({changeSearchString, clearSearchString, searchValue, fetchTodosWithFiltersAndSearch}) {
  return (
    <View>
        <View style={styles.searchIcon}>
          <Ionicons name={'md-search'} size={25}/>
        </View>
      <TextInput
        value={searchValue}
        style={[input, {marginLeft: 10, marginRight: 10, paddingLeft: 40}]}
        onChangeText={text => {
          changeSearchString(text);
          fetchTodosWithFiltersAndSearch();
        }}
      />
      {/* button as cross icon who clears search*/}
      <View style={styles.clearSearch}>
        <Button
          type={'clear'}
          onPress={() => {
            clearSearchString();
            fetchTodosWithFiltersAndSearch();
          }}
          icon={
            <Ionicons size={25} name={'md-close'}></Ionicons>
          }
        />
      </View>
    </View>
  )
}

Search = connect(
  store => ({
    searchValue: store.search.searchString
  }),
  {changeSearchString, clearSearchString, fetchTodosWithFiltersAndSearch}
)(Search)


/***
 * HOME (DEFAULT EXPORTED)
 * ***/
let Home = class extends React.Component {
    componentDidMount() {
        this.props.fetchTodosWithFiltersAndSearch()
    }
    render () {
        const {todos, isFetched} = this.props
        return (
          <View style={styles.container}>
            <NavigationEvents onDidFocus={this.props.fetchTodosWithFiltersAndSearch} />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                Your list of Todos
              </Text>
            </View>
            <Search />
            <ScrollView style={styles.listContainer}>
              <View>
                {isFetched ?
                  <ActivityIndicator/> :
                  <TodoList items={todos} />
                }
              </View>

            </ScrollView>
            <View style={styles.button}>
              <Button
                type={'clear'}
                onPress={() => this.props.navigation.navigate('NewTodo')}
                icon={
                  <Ionicons
                    name={'md-add-circle'}
                    color={'purple'}
                    size={50}
                  />
                }
              />
            </View>
          </View>
        )
    }
}

Home = connect(
  store => ({
    todos: store.todos.data,
    isFetching: store.todos.isFetching,
  }), {fetchTodosWithFiltersAndSearch}
)(Home)

const styles = StyleSheet.create({
  searchIcon: {
    position: 'absolute',
    top: 5,
    left: 20,
  },
  clearSearch: {
    position: 'absolute',
    right: 10,
    top: -3,
    padding: 0,
  },
  emptyListMessage: {
    textAlign: 'center',
    color: '#357'
  },
  container: {
    display: 'flex',
    flexGrow: 1,
  },
  listContainer: {
    position: 'relative',
    zIndex: 1,
  },
  titleContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: 'center',
    color: '#357'
  },
  button: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 50,
    right: 30,
    zIndex: 4,
  },
  itemTitle: {
    fontSize: 20,
    color: '#eee'
  },
  itemBody: {
    fontSize: 17,
    color: '#ccc'
  },
  itemContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#aaa',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#789'
  },
  arrowContainer: {
    position: 'absolute',
    top: '50%',
    right: 10,
  }
})

export default Home