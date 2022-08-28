import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function Statistic(props){
  return(
    <>
      <b>{props.name} {props.counter}</b><br/>
    </>
  )
}


function Statistics(props){
  
  if (props.values.all < 1){
    return (
      <tr>
        <td colSpan={3}><b>No feedback given</b></td>
      </tr>
    )

  }else {
    return (
      <>
        <tr>
          <td colSpan={3} ><Statistic name="good" counter={ props.values.good }/></td>
        </tr>
        <tr>
          <td colSpan={3} ><Statistic name="neutral" counter={ props.values.neutral }/></td>
        </tr>
        <tr>
          <td colSpan={3} ><Statistic name="bad" counter={ props.values.bad }/></td>
        </tr>
        <tr>
          <td colSpan={3} ><b>all { props.values.good + props.values.neutral + props.values.bad }</b><br/></td>
        </tr>
        <tr>
          <td colSpan={3} ><b>average { props.values.avg }</b><br/></td>
        </tr>
        <tr>
          <td colSpan={3} ><b>positive { props.values.positive }%</b></td>
        </tr>
      </>
    )
  }
  
}


function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    const newGood = good + 1
    setGood(newGood)
  }

  const addNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const addBad = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  function avg(){
    let avg = (good - bad) / all()
    if (isNaN(avg)){
      avg = 0
    }
    return avg
  }

  function positive(){
    let positive = good * 100 / all()
    if (isNaN(positive)){
      positive = 0
    }
    return positive
  }

  function all(){
    let all = (good + neutral + bad )
    return all
  }

  const propsStatistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    avg: avg(),
    positive: positive(),
    all: all()
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td colSpan={3}><h1>give feedback</h1></td>
          </tr>
          <tr>
            <td><button onClick={addGood}>good</button></td>
            <td><button onClick={addNeutral}>neutral</button></td>
            <td><button onClick={addBad}>bad</button></td>
          </tr>
          <tr>
            <td colSpan={3}><h1>statistics</h1></td>
          </tr>
          <Statistics values={propsStatistics} />
        </tbody>
      </table>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

