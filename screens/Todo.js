import React from 'react'
import {Text, View, TextInput, StyleSheet, Switch} from 'react-native'
import {connect} from 'react-redux'
import {createNewTodo, fetchTodoById, updateTodoById} from '../store/todos/todosActions'
// import joi from 'joi'
import { Button } from 'react-native-elements';

class Todo extends React.Component {
  state = {
    form: {
      title: '',
      body: '',
      isDone: false,
    },
    errorMessage: null,
    id: null,
  }

  // static formSchema = joi.object().keys({
  //   body: joi.string().required(),
  //   title: joi.string().required(),
  //   isDone: joi.boolean(),
  // })

  changeFormState = (text, field) => {
    this.setState(state => ({...state, form: {...state.form, [field]: text}}))
  }

  submit = () => {
    const validationResult = this.validateForm()
    const submitAction = this.state.id ?
                        (data) => this.props.updateTodoById(this.state.id, data) :
                        this.props.createNewTodo

    if(validationResult.isValid) {
      submitAction(this.state.form)
        .then(() => this.props.navigation.navigate('Home'))
    } else {
      this.setState({errorMessage: validationResult.errorMessage})
    }
  }

  validateForm = () => {
    const validationsResult = {
      isValid: true,
      errorMessage: null
    }

    // joi.validate(this.state.form, NewTodo.formSchema, (err) => {
    //   if(err) {
    //     validationsResult.isValid = false
    //     validationsResult.errorMessage = err
    //   } else {
    //     validationsResult.isValid = true
    //   }
    // })

    return validationsResult
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id')
    if(id) {
      this.setState({id})
      this.props.fetchTodoById(id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.todo !== this.props.todo) {
      const updatedFormData = {}
      // prepare data to push from fetched todo to state
      Object.keys(this.state.form).forEach(field => {
        updatedFormData[field] = this.props.todo[field]
      })

      this.setState(state => ({...state, form: updatedFormData}))
    }
  }

  render() {
    const {id, form, errorMessage} = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {id ? 'Update Todo' : 'New Todo +'}
        </Text>
        <View>
          <TextInput
            style={styles.input}
            value={form.title}
            placeholder={"title"}
            onChangeText={text => this.changeFormState(text, 'title')}
            createNewTodo={'dark'}
          />
          <TextInput
            style={[styles.input, {height: 300}]}
            value={form.body}
            placeholder={"body"}
            multiline={true}
            onChangeText={text => this.changeFormState(text, 'body')}
          />
          <View>
            <Text style={styles.isDoneTitle}>Complited?</Text>
            <Switch
              value={form.isDone}
              onValueChange={value => this.changeFormState(value, 'isDone')}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={'Confirm'}
            onPress={this.submit}
          />
        </View>
        {errorMessage && <View><Text>{errorMessage}</Text></View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    margin: 10,
    fontSize: 24,
    color: 'green'
  },
  input: {
    marginBottom: 10,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 7,
    borderColor: '#eee',
    borderWidth: 1,
    color: 'purple',
    textAlignVertical: "top",
  },
  isDoneTitle: {
    fontSize: 20,
    color: '#eae'
  },
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    marginTop: 10,
  }
});

export default connect(
  store => ({todo: store.todo.data}), {createNewTodo, fetchTodoById, updateTodoById}
)(Todo)