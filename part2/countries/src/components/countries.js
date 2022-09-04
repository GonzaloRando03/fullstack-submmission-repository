import {useState, useEffect} from 'react'
import axios from 'axios'

function CountryData({country}){

    const [weather, setWeather] = useState()

    useEffect(() => {
        const params = {
          access_key: process.env.REACT_APP_API_KEY,
          query: country.capital
        }
    
        axios.get('http://api.weatherstack.com/current?access_key=' + params.access_key + '&query=' + params.query)
          .then(response => {
            const resWeather = response.data;
            setWeather(resWeather)
          })
      })
    
      if (weather.length > 0) {
        const currentWeather = weather[0].current
        return (
          <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p><br/>
            <h2>languages</h2>
            {Object.values(country.languages).map(lng => (<p key={lng}>{lng}</p>))}
            <br/>
            <img src={country.flags.png} alt="flag"/>
            <h2>Weather in {country.capital}</h2>
            <p>temperature: {currentWeather.temperature}° Celcius</p>
            <img src={currentWeather.weather_icons[0]} alt="weather"></img>
            <p>wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}</p>
          </div>
        )
      }
  
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p><br/>
            <h2>languages</h2>
            {Object.values(country.languages).map(lng => (<p key={lng}>{lng}</p>))}
            <br/>
            <img src={country.flags.png} alt="flag"/>
        </div>
        )
}

function Countries({countries}){

    const [ show, setShow ] = useState()

    function showcountry(countryInfo){
        setShow(countryInfo)
    }

    if (countries.length > 10){
        return (<>Too many matches, especify another filter</>)

    }else if(countries.length === 1){
        return ( <CountryData country={countries[0]}/> )

    }else if(countries.length === 0){
        return (<>No countries find :(</>)

    }else{
        return(
            <>
                {countries.map(country => (
                    <div key={country.name.common}>
                        <>{country.name.common}</>
                        <button onClick={() => showcountry(<CountryData country={country}/>)}>show</button><br/>
                    </div>
                ))}
                {show}
            </>
        )
    }

    
}

export default Countries
