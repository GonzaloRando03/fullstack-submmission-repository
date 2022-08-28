import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function App(props){
  let getAnecdoteNumber = () => {
    let min = Math.ceil(0);
    let max = Math.floor(5);
    let number = Math.floor(Math.random() * (max - min + 1) + min)
    return number
    
  }
  

  function newAnecdote(){
    let number = getAnecdoteNumber()
    if (number === selected){
      number--

      if (number < 0){
        number += 2
      }

    }
    setSelected(number)
    setPoint(points[number])
  }


  function addVote(){
    setPoint(points[selected] += 1)
    bestAnecdote()
  }
  

  function bestAnecdote(){
    let bAnecdote = points.indexOf(Math.max(...points))
    setBest(bAnecdote)
  }


  const [selected, setSelected] = useState(getAnecdoteNumber)
  const [best, setBest] = useState(0)
  const [point, setPoint] = useState(0)


  return (
    <div>
      {props.anecdotes[selected]}
      <br/>
      Votes: {point}
      <br/>
      <button onClick={newAnecdote}>New Anecdote</button>
      <button onClick={addVote}>Vote</button>
      <br/>
      <h1>Best Anecdote</h1><br/>
      {props.anecdotes[best]} has {props.points[best]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = [0,0,0,0,0,0]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} points={points} />
  </React.StrictMode>
);

