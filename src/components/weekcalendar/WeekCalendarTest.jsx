import React from "react";
import styled from "styled-components";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarWrapper = styled.div`
  margin: 0 auto;
  border-radius: 15px;
  background: #fff;
  width: 390px;
  height: 100%;
  padding: 15px 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const Row = styled.div`
  display: flex;
`;

const RowLineY = styled.div`
  border-bottom: 1px solid rgba(78, 116, 29, 0.5);
`;

const DayCell = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 600;
  padding: 3px auto;
  color: ${props => props.color || "#4e741d"};
  // 마지막 요소 제외한 셀에만 적용
  &:not(:last-child) {
    border-right: 1px solid rgba(78, 116, 29, 0.5);
  }
`;

const DateCell = styled.div`
  flex: 1;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: rgba(78, 116, 29, 0.1);
  padding: 8px auto;
  // 마지막 요소 제외한 셀에만 적용
  &:not(:last-child) {
    border-right: 1px solid rgba(78, 116, 29, 0.5);
  }
`;

const MonthCalendar = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // 이번 달 첫째 날
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();

  // 이번 달 총 일수
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 총 셀 개수 = 앞에 비는 칸 + 날짜 수
  const totalCells = Math.ceil((startDay + lastDate) / 7) * 7;

  const dates = Array.from({ length: totalCells }, (_, i) => {
    const dateNum = i - startDay + 1;
    return dateNum > 0 && dateNum <= lastDate ? dateNum : null;
  });

  const rows = [];
  for (let i = 0; i < dates.length; i += 7) {
    rows.push(dates.slice(i, i + 7));
  }

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
      <RowLineY />
      {rows.map((week, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <Row>
            {week.map((date, colIndex) => (
              <DateCell key={colIndex}>{date !== null ? date : ""}</DateCell>
            ))}
          </Row>
          {rowIndex !== rows.length - 1 && <RowLineY />}
        </React.Fragment>
      ))}
    </CalendarWrapper>
  );
};

export default MonthCalendar;
