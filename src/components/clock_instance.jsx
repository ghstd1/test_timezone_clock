import React from 'react'
import { useSelector } from 'react-redux';

export const ClockInstance = ({ time }) => {
  // получаем список часовых поясов из глобального хранилища Redux
  const timezones_list = useSelector(store => store.timezone_list.timezones_list)

  // онициализируем состояние текущего часового пояса
  const [currentTimezone, setCurrentTimezone] = React.useState('0')

  // обновляем текущий часовой пояс при изменении списка часовых поясов
  React.useEffect(() => {
    if (timezones_list.length > 0) {
      setCurrentTimezone(timezones_list[0].timezone)
    }
  }, [timezones_list])

  // обработчик изменения выбранного пользователем часового пояса
  const selectorChange_handler = (event) => {
    const target = event.target,
    value = target.type === 'checkbox'? target.checked :target.value;
    
  setCurrentTimezone(value)
  }

  // функция форматирования времени
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  // функция расчета времени в заданном часовом поясе
  const calculateTime = (date, timezone) => {
    if (typeof timezone != 'string') return date

    // получаем смещение текущей локации относительно UTC
    const offset = new Date().getTimezoneOffset() / 60;
    
    const [hours, minutes] = timezone.split(":");

    // расчет смещения для выбранного часового пояса
    const timeZoneOffset = parseInt(hours, 10) + offset;

    // применение смещения к текущему времени
    const targetTime = new Date(date.getTime() + timeZoneOffset * 60 * 60 * 1000);

    return targetTime;
  };
  
  // рассчитываем время в заданном часовом поясе
  const targetTime = calculateTime(time, currentTimezone);
  
  let date = targetTime,
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds()

  // Определяем положение стрелок на циферблате
  let hands = [
    {
      hand: 'hours',
      angle: (hours * 30) + (minutes / 2),
    },
    {
      hand: 'minutes',
      angle: (minutes * 6),
    },
    {
      hand: 'seconds',
      angle: (seconds * 6),
    }
  ];

  // Возвращаем разметку компонента для отображения времени в заданном часовом поясе
  return (
    <div className="clock_instance_container">
      {/* блок аналогвых часов */}
      <div className="clock">
        <div className="hours-container" style={{
          transform: `rotateZ(${hands[0].angle}deg)`
        }}>
          <div className="hours"></div>
        </div>
        <div className="minutes-container" style={{
          transform: `rotateZ(${hands[1].angle}deg)`
        }}>
          <div className="minutes"></div>
        </div>
        <div className="seconds-container" style={{
          transform: `rotateZ(${hands[2].angle}deg)`
        }} >
          <div className="seconds"></div>
        </div>
      </div>
      {/* блок цифровых часов */}
      <time className="digital_clock">
        <span>{formatTime(targetTime)}</span>
      </time>
      {/* выпадающий список часовых поясов */}
      <select 
        name="timezone_selector_name" 
        id="timezone_selector_id" 
        className="timezone_selector"
        value={currentTimezone}
        onChange={selectorChange_handler}>
        {timezones_list.map((timezone, index) => {
          return (
            <option
              key={index} 
              value={timezone.timezone}>
              {timezone.name} {timezone.timezone}
            </option>
          )
        }
        )}
      </select>
    </div>
  )
}
