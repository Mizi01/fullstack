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
        .delete(`http://localhost:3001/persons/${props.click.id}`)
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

  const addName = (event) => {
    event.preventDefault()
    console.log(persons)
    var testi = persons.map(name=> name.name)
    if (testi.includes(newName)) {
      window.alert(newName + ' is already added to phonebook')
    }
    else {
       const nameObject = {
      name: newName,
      number: newNumber,
    }

    setDeleteMessage(
      `'${newName}' was added`
    )
    setTimeout(() => {
      setDeleteMessage(null)
    }, 2000)

    personService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
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
      {persons.map(person =>
        <Person key={person.id} person={person} />)}
    </div>
  )

}

export default App