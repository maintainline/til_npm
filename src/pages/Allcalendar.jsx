import React, { useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

const CalendarWrapper = styled.div`
  width: 390px;
  margin: 0 auto;
  padding: 15px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);

  .react-calendar {
    border: none;
    width: 100%;
    background: transparent;
  }

  .react-calendar__tile--now {
    background: #e6f7e6;
    border-radius: 10px;
  }

  .react-calendar__tile--active {
    background: #4e741d;
    color: #fff;
    border-radius: 10px;
  }
`;

const AllCalendar = () => {
  const [value, setValue] = useState(new Date());

  return (
    <CalendarWrapper>
      <Calendar
        onChange={setValue}
        value={value}
        calendarType="ISO 8601" // Monday부터 시작
        locale="ko-KR"
      />
    </CalendarWrapper>
  );
};

export default AllCalendar;
