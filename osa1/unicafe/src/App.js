import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = props => {
  console.log(props)
  return (
    <>{props.text} {props.value}</>
  )
}

const Statistics = (props) => {
  console.log(props.all)
  if(props.all[0] === 0 && props.all[1]=== 0 && props.all[2]===0) {
    return (
    <>No feedback given</>
    )
  }
    return (
      <>
      <div><StatisticLine value={props.all[2]} text='good' /></div>
      <div><StatisticLine value={props.all[1]} text='neutral' /></div>
      <div><StatisticLine value={props.all[0]} text='bad'/></div>
      <div><StatisticLine value={props.all[0]+props.all[1]+props.all[2]} text='all'/></div>
      <div><StatisticLine value={(props.all[2]-props.all[0])/(props.all[0]+props.all[1]+props.all[2])} text='average'/></div>
      <div><StatisticLine value={props.all[2]*100/(props.all[0]+props.all[1]+props.all[2])} text='positive' /> <>%</></div>
      </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])

  return (
    <div>
      <h1>give feedback</h1>
    <Button handleClick={()=>setGood(good+1)} text='good' />
    <Button handleClick={()=>setNeutral(neutral+1)} text='neutral' />
    <Button handleClick={()=>setBad(bad+1)} text='bad' />
    <h2>statistics</h2>
    <Statistics all={all.concat(bad, neutral, good)} />
    </div>
  )
}

export default App