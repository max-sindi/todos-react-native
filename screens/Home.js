import React from 'react'
import {NavigationEvents, withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import {fetchTodos} from '../store/todos/todosActions'
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  EditTodo,
  TouchableOpacity
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
            <View>
                <Text style={styles.itemBody}>{item.body}</Text>
            </View>
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

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchTodos()
    }

// {/*<FlatList*/}
// {/*data={todos}*/}
// {/*renderItem={({item}) => <TodoItem key={item.id} item={item}/>}*/}
// {/*/>*/}
    render () {
        const {todos, isFetched} = this.props
        return (
            <ScrollView style={styles.container}>
              <View style={styles.listContainer}>
                  {isFetched ?
                    <ActivityIndicator/> :
                    <TodoList items={todos} />
                  }
              </View>
              <View style={styles.button}>
                <Button
                  onPress={() => this.props.navigation.navigate('NewTodo')}
                  title={'+'}
                />
              </View>

              <NavigationEvents onDidFocus={this.props.fetchTodos} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  listContainer: {
    position: 'relative',
    zIndex: 2,
  },
  button: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    bottom: 20,
    right: 20,
    zIndex: 10,
    fontSize: 30,
    borderRadius: 50,
    backgroundColor: 'red'
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
    backgroundColor: '#aaa',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'red'
  },
})

export default connect(
    store => ({
        todos: store.todos.data,
        isFetching: store.todos.isFetching,
    }), {fetchTodos}
)(Home)