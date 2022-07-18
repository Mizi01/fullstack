import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  var classNameT = "error"
  if (message.includes('added')) {
    console.log("sisältää added")
    classNameT = "add"
  }
  return(
    <div className={classNameT}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [deleteMessage, setDeleteMessage] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  console.log('render', persons.length, 'persons')

  const DeleteButton = (props) => {
    console.log(props.click.id)
    const deletePerson = () => {
      console.log(props)
      if (window.confirm(`are you sure you want delete person ${props.click.name}`)) {
      console.log(`deleting ${props.click.name}`)
        axios
        .delete(`/api/persons/${props.click.id}`)
        setPersons(persons.filter(person => person !== props.click))
        setDeleteMessage(
          `'${props.click.name}' was deleted`
        )
        setTimeout(() => {
          setDeleteMessage(null)
        }, 2000)
      }
    }
  return (
    <button onClick={deletePerson}>delete</button>
    
  )
  }
  
  const Person = (person) => {
    console.log(person)
    return (
      <li>{person.person.name} {person.person.number} <DeleteButton click={person.person}/></li>
    )
  }


    const handleFilter = (event) => {
      setFilter(event.target.value)
    }

  const addName = (event) => {
    event.preventDefault()
    console.log(persons)
    var testi = persons.find(name=> name.name === newName)
    if (testi) {
      if(window.confirm(newName + ' is already added to phonebook, replace the old number with new one?')){
        const nameObject = {
          name: newName,
          number: newNumber
        }
        const oldPerson = persons.find(person => person.name === newName)
        console.log(oldPerson)
        personService
        .update(oldPerson.id, nameObject)
        .then(response => {
          setPersons(persons.map(person => person.name !== newName ? person : response))
          setNewName('')
          setNewNumber('')
        })
      }

    }
    else {
       const nameObject = {
      name: newName,
      number: newNumber,
    }

    personService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')

    })
    .catch(error => {
      setDeleteMessage(`${error.response.data.error}`)
      setTimeout(() => {
        setDeleteMessage(null)
      }, 2000)
      console.log(error.response.data)
    })
    setDeleteMessage(
      `'${newName}' was added`
    )
    setTimeout(() => {
      setDeleteMessage(null)
    }, 2000)
  }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={deleteMessage} />
      <div>filter names <input value={filter} onChange={handleFilter} /></div>
      <form onSubmit={addName}>
          <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          /></div>
          <div>number: <input
          value={newNumber}
          onChange={handleNumberChange}
          /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1).map(person =>
        <Person key={person.id} person={person} />)}
    </div>
  )

}

export default App