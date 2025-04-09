import React from 'react';
import Day from './day/day';
import Ticket from './ticket/ticket';

const Timeline = ({ data, selectedMonth }) => {
  // Función para filtrar los tickets por mes
  const filterTicketsByMonth = (data, month) => {
    if (!month) return data; // Si no hay mes seleccionado, no filtramos

    const [selectedYear, selectedMonthIndex] = month.split('-'); // El mes seleccionado viene en formato 'YYYY-MM'

    return data.filter(ticket => {
      const itemDate = new Date(ticket.date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth(); // Mes del ticket (0 - 11)

      return itemYear === parseInt(selectedYear) && itemMonth === parseInt(selectedMonthIndex) - 1;  // Comparar año y mes
    });
  };

  // Filtramos los tickets por el mes seleccionado
  const filteredTickets = filterTicketsByMonth(data, selectedMonth);

  // Función para agrupar los tickets por fecha
  const groupByDate = (data) => {
    return data.reduce((acc, ticket) => {
      const ticketDate = ticket.date;  // Usamos la fecha de cada ticket
      if (!acc[ticketDate]) {
        acc[ticketDate] = [];
      }
      acc[ticketDate].push(ticket);
      return acc;
    }, {});
  };

  // Agrupamos los tickets filtrados por fecha
  const groupedTickets = groupByDate(filteredTickets);

  // Obtenemos las fechas y las ordenamos de la más reciente a la más antigua
  const sortedDates = Object.keys(groupedTickets).sort((a, b) => new Date(b) - new Date(a));

  return (
    <section>
      {/* Mapeamos las fechas ordenadas y sus respectivos tickets */}
      {sortedDates.map((date, index) => {
        // Sumamos un día a la fecha antes de pasarla a Day
        const adjustedDate = new Date(date);
        adjustedDate.setDate(adjustedDate.getDate() + 1); // Sumamos un día

        return (
          <section key={index}>
            <Day date={adjustedDate.toISOString().split('T')[0]} />

            {/* Renderiza los tickets de esa fecha */}
            {groupedTickets[date].map((ticket, ticketIndex) => (
              <Ticket
                key={ticketIndex}
                category={ticket.category}
                value={ticket.value}
                name={ticket.name}
                details={ticket.details}  // Aseguramos que se pase el campo details
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
