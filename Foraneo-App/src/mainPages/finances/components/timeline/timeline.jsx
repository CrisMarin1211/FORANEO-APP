import React from 'react';
import Day from './day/day';
import Ticket from './ticket/ticket';

const Timeline = ({ data, selectedMonth }) => {

  const filterTicketsByMonth = (data, month) => {
    if (!month) return data;

    const [selectedYear, selectedMonthIndex] = month.split('-');

    return data.filter(ticket => {
      const itemDate = new Date(ticket.date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth();

      return itemYear === parseInt(selectedYear) && itemMonth === parseInt(selectedMonthIndex) - 1;
    });
  };


  const filteredTickets = filterTicketsByMonth(data, selectedMonth);


  const groupByDate = (data) => {
    return data.reduce((acc, ticket) => {
      const ticketDate = ticket.date;
      if (!acc[ticketDate]) {
        acc[ticketDate] = [];
      }
      acc[ticketDate].push(ticket);
      return acc;
    }, {});
  };


  const groupedTickets = groupByDate(filteredTickets);


  const sortedDates = Object.keys(groupedTickets).sort((a, b) => new Date(b) - new Date(a));

  return (
    <section >

      {sortedDates.map((date, index) => {

        const adjustedDate = new Date(date);
        adjustedDate.setDate(adjustedDate.getDate() + 1);

        return (
          <section key={index}>
            <Day date={adjustedDate.toISOString().split('T')[0]} />


            {groupedTickets[date].map((ticket, ticketIndex) => (
              <Ticket
                key={ticketIndex}
                category={ticket.category}
                value={ticket.value}
                name={ticket.name}
                details={ticket.details}
                type={ticket.type}
              />
            ))}
          </section>
        );
      })}
    </section>
  );
};

export default Timeline;
