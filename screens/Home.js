import React from 'react'
import {NavigationEvents, withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import {fetchTodos} from '../store/todos/todosActions'
import {Ionicons} from '@expo/vector-icons'
import {Button} from 'react-native-elements'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ScrollView,
  EditTodo,
  TouchableOpacity,
  Transforms,
} from 'react-native'

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

const TodoList = function({items}) {
  return (
    <View>
        {items.map((item) => <TodoItem key={item.id} item={item}/>)}
    </View>
  )
}

// {/*<FlatList*/}
// {/*data={todos}*/}
// {/*renderItem={({item}) => <TodoItem key={item.id} item={item}/>}*/}
// {/*/>*/}

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchTodos()
    }
    render () {
        const {todos, isFetched} = this.props
        return (
          <View style={styles.container}>
            <NavigationEvents onDidFocus={this.props.fetchTodos} />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                Your list of Todos
              </Text>
            </View>
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

const styles = StyleSheet.create({
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

export default connect(
    store => ({
        todos: store.todos.data,
        isFetching: store.todos.isFetching,
    }), {fetchTodos}
)(Home)