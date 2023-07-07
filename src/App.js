import React from 'react';
import './App.css';
import { BarLoader } from 'react-spinners';
import { ClockInstance } from './components/clock_instance';
import { useSelector, useDispatch } from 'react-redux';
import { addTimezones } from './store/timezone_slice';

const timezones_json_URL = 'https://raw.githubusercontent.com/ghstd1/test_download_json/main/timezones.json'

function App() {
  const [time, setTime] = React.useState(new Date());
  const [isLoading, setIsLoading] = React.useState(false);
  const timezone_list = useSelector(store => store.timezone_list.timezones_list)
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch_timezones(timezones_json_URL)
  }, []);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    if (timezone_list.length === 0) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [timezone_list])
  
  async function fetch_timezones(url) {
    const response = await fetch(url);
    const data = await response.json();
    
    dispatch(addTimezones(data))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Тестовое задание на часы
        </h1>      
      </header>
      <main className="App-main">
        {isLoading ? 
        <div className='loading_container'>
          <BarLoader
            color={'#282c34'}
            size={300} />
          <p>Загрузка данных о часовых поясах...</p>
        </div> :
        <div className='clocks_collection_container'>
          <ClockInstance
            time={time} />
          <ClockInstance
            time={time} />
        </div>
        }
      </main>
    </div>
  );
}

export default App;
