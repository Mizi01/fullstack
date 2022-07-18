import { useState, useEffect } from 'react'
import service from './services/countries'
import axios from 'axios'


const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
    .catch(()=> {
      setCountries(null)
    })
  }, [])

  console.log(countries)

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = (

    countries.filter(country => country.name.common.toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1)

  )

  const Country = () => {
    if(countries) {    
      if(filteredCountries.length === 0) return <div>not found...</div>
    if(filteredCountries.length === 1) {
      const country = filteredCountries[0]
      const languages = country.languages
      const flag = country.flags
      console.log(languages)
      return (
        <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h2>languages:</h2>
        {Object.values(languages).map(language => 
        <li key={language}>
          {language}
          </li>)}
        <img src={flag.png}/>
        </div>
      )
    } else if(filteredCountries.length<11) {
    return (
      <div>{filteredCountries.map(country => <div key={country.name.common}>{country.name.common}<button onClick={()=>setFilter(country.name.common)}>show</button></div>)}</div>
    )
    } else {
      return (
        <div>too many results</div>
      )
    }
  }
}

  return (
    <div>find countries <input value={filter} onChange={handleFilter} />
    <Country />
    </div>
  )
}

export default App