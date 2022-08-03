import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteReduxAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: action.payload.votes
      }
    return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes, voteReduxAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.vote(anecdote)
    dispatch(voteReduxAnecdote(anecdoteToVote))
  }
}

export default anecdoteSlice.reducer