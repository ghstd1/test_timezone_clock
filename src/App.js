import React from 'react';
import './App.css';
import { BarLoader } from 'react-spinners';
import { ClockInstance } from './components/clock_instance';
import { useSelector, useDispatch } from 'react-redux';
import { addTimezones } from './store/timezone_slice';

// ссылка на файл timezones.json
const timezones_json_URL = 'https://raw.githubusercontent.com/ghstd1/test_download_json/main/timezones.json'


//определение компонента App
function App() {

  // организация состояний локального времени
  const [time, setTime] = React.useState(new Date());

  // организация состояния загрузки данных о часовых поясах
  const [isLoading, setIsLoading] = React.useState(false);

  // получение состояния списка часовых поясов из Redux
  const timezone_list = useSelector(store => store.timezone_list.timezones_list)

  // золучение объекта dispatch из Redux store
  const dispatch = useDispatch();

  // здесь происходит загрузка данных о часовых поясах при монтировании компонента
  React.useEffect(() => {
    fetch_timezones(timezones_json_URL)
  }, []);
  
  // обновление состояния time каждую секунду
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  // обновление состояния isLoading при изменении списка часовых поясов
  React.useEffect(() => {
    if (timezone_list.length === 0) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [timezone_list])
  
  // функция для загрузки данных о часовых поясах с сервера
  async function fetch_timezones(url) {
    const response = await fetch(url);
    const data = await response.json();
    
    dispatch(addTimezones(data))
  }

  // отрисовка компонента App
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Тестовое задание на часы
        </h1>      
      </header>
      <main className="App-main">
        {isLoading ?
        // отображение индикатора загрузки при isLoading === true
        <div className='loading_container'>
          <BarLoader
            color={'#282c34'}
            size={300} />
          <p>Загрузка данных о часовых поясах...</p>
        </div> :
         // отображение списка циферблатов при isLoading === false
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

// экспорт компонента App
export default App;
