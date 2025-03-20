import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weather, setWeather] = useState({});
  const [countryAll, setCountry] = useState({});
  const inputRef = useRef();

  async function searchCity() {
    const cityInput = inputRef.current.value;
    const keyApi = 'fcd8dec913a80b68118d347f08b06bce';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${keyApi}&lang=pt_br&units=metric`;

      const weatherInfo = await axios.get(url);
      setWeather(weatherInfo.data);
  }

  // ####### PEGANDO PAÍS ########

  useEffect(() => {
    // Verifica se as informações do clima e do país estão disponíveis
    const pegandoDados = async ()=>{
    if (weather.sys && weather.sys.country) {
      const paisDoEstado = weather.sys.country;
      const urlCountry = `https://restcountries.com/v3.1/alpha/${paisDoEstado}`;

      const countryInfo = await axios.get(urlCountry)
      setCountry(countryInfo.data);
    }
    
    }

    pegandoDados()

  }, [weather]);



  useEffect(() => { 
    console.log(weather); 
  }, [weather]);

  useEffect(() => { 
    console.log(countryAll[0]); 
  }, [countryAll]);



  return (
    <div className='container'>
      <h1>Previsão do tempo</h1> <br /><br /><br />

      <div className='input-Button'>
      <input ref={inputRef} type="text" placeholder='Digite o nome da cidade' />
      <button onClick={searchCity}>Buscar</button> <br /> <br />
      </div>

      <div className="containerTemperature">
      <div className='nameTemperature'>
        {/* Nome da cidade */}
        <h2>{weather.name ? weather.name : ""}</h2>
        {/* Temperatura */}
        {weather.main && (<p>{Math.round(weather.main.temp)}°C</p>)}
        <p className='descriptionUnique'>
          {/* Descrição do clima (nublado, por exemplo) */}
          {weather.weather && weather.weather[0] && weather.weather[0].description ? weather.weather[0].description : ''}
        </p>
          
        <p>
          {/* Ícone do clima */}
          <img className='iconClima' src={`https://openweathermap.org/img/wn/${weather.weather && weather.weather[0] && weather.weather[0].icon ? weather.weather[0].icon + "@2x.png" : ''}`}/>
        </p>

      </div>

      <div className='infoTemperature'>
        {/* Informações do clima */}
        <p>{weather.main && weather.main.feels_like ? "Sensação Térmica: " + weather.main.feels_like + "°C" : ''} </p>
        <p>{weather.main && weather.main.humidity ? "Umidade: "+ weather.main.humidity + "%": ''} </p>
        <p>{weather.main && weather.main.pressure ? "Pressão: " + weather.main.pressure : ''}</p>
      </div>
      </div>

      <br /> <br />
      <h2>{countryAll[0] && countryAll[0].name && countryAll[0].name.common ? countryAll[0].name.common : '' }  {countryAll[0] && countryAll[0].altSpellings && countryAll[0].altSpellings[1] ? " - "+ countryAll[0].altSpellings[1] : '' }</h2>
      <img className='flagImg' src={countryAll[0] && countryAll[0].flags && countryAll[0].flags.svg ? countryAll[0].flags.svg : '' }/>
      <div className='descript'> {countryAll[0] && countryAll[0].flags && countryAll[0].flags.alt ? countryAll[0].flags.alt : '' }</div>
      <br /><br />
      <h2>{countryAll[0] && countryAll[0].coatOfArms && countryAll[0].coatOfArms.svg ? "Brasão de armas" : '' }</h2>
      <img className='flagImg' src={countryAll[0] && countryAll[0].coatOfArms && countryAll[0].coatOfArms.svg ? countryAll[0].coatOfArms.svg : '' }/>
    </div>
  );
}

export default App;
