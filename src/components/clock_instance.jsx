import React from 'react'
import { useSelector } from 'react-redux';

export const ClockInstance = ({ time}) => {
  const timezones_list = useSelector(store => store.timezone_list.timezones_list)
  const [currentTimezone, setCurrentTimezone] = React.useState('0')

  React.useEffect(() => {
    if (timezones_list.length > 0) {
      setCurrentTimezone(timezones_list[0].timezone)
    }
  }, [timezones_list])

    
    const selectorChange_handler = (event) => {
      const target = event.target,
      value = target.type === 'checkbox'? target.checked : target.value;
      
    setCurrentTimezone(value)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const calculateTime = (date, timezone) => {
    if (typeof timezone != 'string') return date
    
    if (timezone === 'default') {
      timezone = timezones_list[0].timezone
    }

    const offset = new Date().getTimezoneOffset() / 60; // Получаем смещение текущей локации относительно UTC
    const [hours, minutes] = timezone.split(":");
    const timeZoneOffset = parseInt(hours, 10) + offset; // Расчет смещения для выбранного часового пояса
    const targetTime = new Date(date.getTime() + timeZoneOffset * 60 * 60 * 1000); // Применение смещения к текущему времени
    return targetTime;
  };
  
  const targetTime = calculateTime(time, currentTimezone);
  
  let date = targetTime,
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds()

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

  return (
    <div className="clock_instance_container">
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
      <time className="digital_clock">
        <span>{formatTime(targetTime)}</span>
      </time>
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
