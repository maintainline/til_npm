import React from "react";
import styled from "styled-components";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarWrapper = styled.div`
  border-radius: 15px;
  background: #fff;
  width: 390px;
  padding: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const Row = styled.div`
  display: flex;
`;

const DayCell = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 800;
  padding: 6px;
  color: ${props => props.color || "#4e741d"};
`;

const DateCell = styled.div`
  flex: 1;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: rgba(78, 116, 29, 0.1);
  padding: 8px 0;
  border-radius: 10px;
`;

const WeekCalendar = () => {
  const today = new Date();

  // 오늘 포함된 주의 일요일~토요일 구하기
  const getWeekDates = baseDate => {
    const sunday = new Date(baseDate);
    sunday.setDate(baseDate.getDate() - baseDate.getDay());

    return [...Array(7)].map((_, i) => {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates(today);

  return (
    <CalendarWrapper>
      <Row>
        {weekDays.map((day, i) => (
          <DayCell
            key={day}
            color={i === 0 ? "#ed7777" : i === 6 ? "#4985b7" : "#4e741d"}
          >
            {day}
          </DayCell>
        ))}
      </Row>
      <Row>
        {weekDates.map(date => {
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          return (
            <DateCell key={date.toISOString()} isToday={isToday}>
              {date.getDate()}
            </DateCell>
          );
        })}
      </Row>
    </CalendarWrapper>
  );
};

export default WeekCalendar;
