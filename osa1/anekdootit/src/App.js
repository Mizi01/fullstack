import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const votes = anecdotes.map(anecdote => [0])
   
  const [selected, setSelected] = useState(0)
  const [votesS, setVotesS] = useState(votes)
  const [maxVotes, setMaxVotes] = useState(anecdotes[0])

  const nextAnecdote = (event) => {
    const rndAne = Math.floor(Math.random()*(anecdotes.length))
    console.log(rndAne)
    setSelected(rndAne)
  }

  const vote = (event) => {
    const copy = [...votesS]
    copy[selected] = Number(copy[selected] + 1)
    setVotesS(copy)
    const index = anecdotes.indexOf(maxVotes)
    console.log(index)
    if(copy[selected]>votesS[index]) {
    setMaxVotes(anecdotes[selected]) }
    console.log(copy)
  }


  return (
    <div>{anecdotes[selected]}
    <div>votes: {votesS[selected]}</div>
    <button onClick={nextAnecdote}>next anecdote</button>
    <div><button onClick={vote}>vote</button></div>
    <div>{maxVotes}</div>
    </div>
  )
}

export default App
