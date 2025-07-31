import CounterAtom from "./components/CounterAtom";
import TodoList from "./components/TodoList";
import WeekCalendar from "./components/weekcalendar/WeekCalendar";
import WeekCalendarTest from "./components/weekcalendar/WeekCalendarTest";

function App() {
  return (
    <div>
      <CounterAtom />
      <TodoList />
      {/* <WeekCalendarTest /> */}
    </div>
  );
}

export default App;
