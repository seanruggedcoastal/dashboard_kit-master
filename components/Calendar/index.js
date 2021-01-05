import React from 'react'
import {
  CalendarWrapper, 
  HeaderWrapper, 
  DaysWrapper, 
  DateWrapper, 
  Row, 
  Cell,
  EventWrapper
} from './styles'
import {Arrow} from '../Icons'
import dateFns from "date-fns"





const Header = ({currentMonth, nextMonth, prevMonth}) => {
  const dateFormat = "MMMM YYYY";
  return (
    <HeaderWrapper>
      <button onClick={() => prevMonth()}><Arrow /></button>
      <span>{dateFns.format(currentMonth, dateFormat)}</span>
      <button onClick={() => nextMonth()}><Arrow  style={{transform: 'scaleX(-1)'}}/></button>
    </HeaderWrapper>
  )
}

const Days = ({currentMonth}) => {
  const dateFormat = "ddd";
  const days = [];
  let startDate = dateFns.startOfWeek(currentMonth);

  for (let i = 0; i < 7; i++) {
    days.push(
      <div key={i}>
        {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
      </div>
    );
  }

  return <DaysWrapper>{days}</DaysWrapper>;
}

const Cells = ({currentMonth, events}) => {

  const monthStart = dateFns.startOfMonth(currentMonth);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const rows = [];

  let days = [];
  let day = startDate;

  const formattedDate = (date) => dateFns.format(date, 'MM/DD/YYYY');

  const eventsMap = events.reduce((a, b) => {
    const key = formattedDate(b.start);
    if (a[key]) a[key].push(b);
    else a[key] = [b];

    return a;
  }, {});



  while (day <= endDate) {

    for (let i = 0; i < 7; i++) {
      const formattedDate = (date) => dateFns.format(date, 'MM/DD/YYYY');

      const onDateEvents = eventsMap[formattedDate(day).split("T")[0]];


      days.push(
        <Cell today={dateFns.isSameDay(day, new Date())} key={day}>
          <span>{dateFns.format(day, "D")}</span>
          {onDateEvents && <EventWrapper>{onDateEvents[0].title}</EventWrapper>}
        </Cell>
      );
  
      day = dateFns.addDays(day, 1);
    }

    rows.push(
      <Row key={day}>
        {days}
      </Row>
    );

    days = [];
  }

  return <DateWrapper>{rows}</DateWrapper>;
}



const Calendar = (props) => {

  const [state, setState] = React.useState({
    currentMonth: new Date()
  })

  const nextMonth = () => {
    let nextMonth = dateFns.addMonths(state.currentMonth, 1)
    setState({
      currentMonth: nextMonth
    });
  };



  const prevMonth = () => {
    let prevMonth = dateFns.subMonths(state.currentMonth, 1)
    setState({
      currentMonth: prevMonth
    });
  };



  return (
    <CalendarWrapper>
      <Header currentMonth={state.currentMonth} nextMonth={nextMonth} prevMonth={prevMonth}/>
      <Days currentMonth={state.currentMonth}/>
      <Cells 
        currentMonth={state.currentMonth}
        events={props.events}
      />
    </CalendarWrapper>
  )
}

export default Calendar;