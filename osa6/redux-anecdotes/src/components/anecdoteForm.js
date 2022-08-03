import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationRecuder'

const NewAnecdote = (props) => {
    //const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.setNotification(`you added '${content}'`, 5)
        props.createAnecdote(content)
      }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
        </form>
        </>
    )
}

const mapDispatchToProps = {
    setNotification,
    createAnecdote
}

const ConnectedtAnecdotes = connect(
    null,
    mapDispatchToProps
)(NewAnecdote)


export default ConnectedtAnecdotes