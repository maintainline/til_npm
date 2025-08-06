import moment from "moment";
import Calendar from "react-calendar";
import "./WeekCalendar.css";
import { useState } from "react";

function WeekCalendar() {
  const weekName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    return weekName[idx];
  };
  const formatDay = (locale, date) => {
    return moment(date).format("D");
  };
  const [currentDate, setCurrentDate] = useState(new Date());

  // 이전 달 계산
  const getPrevMonthLabel = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    return `${prev.getMonth() + 1}월`;
  };

  // 다음 달 계산
  const getNextMonthLabel = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    return `${next.getMonth() + 1}월`;
  };

  return (
    <div>
      <h1>캘린더 출력</h1>
      <br />
      <br />
      <br />
      <div>
        <Calendar
          value={currentDate}
          onActiveStartDateChange={({ activeStartDate }) => {
            setCurrentDate(activeStartDate);
          }}
          navigationLabel={({ date, locale }) =>
            date.toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
            }) + " 기록"
          }
          prevLabel={
            <span className="custom-button">{getPrevMonthLabel()}</span>
          }
          nextLabel={
            <span className="custom-button">{getNextMonthLabel()}</span>
          }
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          formatDay={formatDay}
        />
      </div>
    </div>
  );
}

export default WeekCalendar;
