import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if ( state.filter === 'ALL' ) {
      return state.anecdotes
    } else {
      let filteredAnecdotes =  state.anecdotes.filter(function(anecdote) {
        return anecdote.content.includes(state.filter)
      })
      return filteredAnecdotes
    }
  })

  if (anecdotes.length > 0) {
    anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const vote = (id) => {
    dispatch(addVote(id))
  }

  return(
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
