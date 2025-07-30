import moment from "moment";
import React from "react";
import Calendar from "react-calendar";
import "./WeekCalendar.css";

function WeekCalendar() {
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    return weekName[idx];
  };
  const formatDay = (locale, date) => {
    return moment(date).format("D");
  };

  return (
    <div>
      <h1>캘린더 출력</h1>
      <div>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          formatDay={formatDay}
        />
      </div>
    </div>
  );
}

export default WeekCalendar;
