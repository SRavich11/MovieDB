import { useEffect, useReducer, useState } from "react";
//import CurrencyRow from "./CurrencyRow";
import './App.css';

const BASE_URL = 'http://openexchangerates.org/api/latest'

const actions = {
  ADD_TODO: 'add_todo',
  TOGGLE_TODO: 'toggle_todo'
}

/*

function reducer(state, action)
{
  switch(action.type)
  {
    case actions.INCREMENT:
      return state +1;
    case actions.DECREMENT:
      return state -1;
    default:
      return state
  }

  <>
  <button onClick = {() => dispatch({type: 'decrement'})}>-</button>
  <h1>{count}</h1>
  <button onClick = {() => dispatch({type: 'increment'})}>+</button>
  </>
}
*/

function reducer(state, action)
{
switch(action.type)
{
  case actions.ADD_TODO:
    return {
      todos: [
      ...state.todos,
      {
        text: action.text,
        completed: false
      }
    ]
  }

  case actions.TOGGLE_TODO:
    return {
      todos: state.todos.map((todo, idx) => 
        (idx === action.id) ? {...todo, completed: !todo.completed} : todo
      )
  }
    }
}

function App() {

  const [{ todos }, dispatch] = useReducer(reducer, {todos: []});
  const [text, setText] = useState('');
  /*
  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => console.log(data))
  }, [])
 */
  return (
    <>
    <form onSubmit={e => {
      e.preventDefault()
      dispatch({type: 'add_todo', text})
      setText("")
    }}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)}>
      </input>
    </form>
    <div>
      {todos.map((todo, idx) => {
        return <h1 
        onClick={() => dispatch({type: 'toggle_todo', id: idx})}
        style={
          {
            textDecoration: todo.completed ? "line-through" : ""
          }
        }
         id = {idx}>{todo.text}
         </h1>
      })}
    </div>
    </>
  );
}

export default App;
