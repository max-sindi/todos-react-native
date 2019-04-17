import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import {Provider} from 'react-redux'
import store from './store'
import Home from './screens/Home'
import Todo from './screens/Todo'

const NavigationContainer = createAppContainer(createStackNavigator(
    {
      Home: {screen: Home},
      NewTodo: {screen: Todo},
      EditTodo: {screen: Todo}
    },
    {
        initialRouteName: "Home"
    }

))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
    render() {
      return (
          <Provider store={store}>
            <NavigationContainer/>
          </Provider>
      );
  }
}