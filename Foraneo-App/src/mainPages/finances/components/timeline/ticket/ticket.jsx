import React from "react";
import {
  Utensils, Bus, PartyPopper, Home, BookOpenCheck, User, Gamepad2, Heart,
  BanknoteArrowDown, Gift, AlertTriangle, MoreHorizontal, Banknote, BriefcaseBusiness, ChartNoAxesCombined
} from "lucide-react";
import './ticket.css';

const Ticket = ({ category, value, name, details, type }) => {
  // Objeto para mapear categorías a sus iconos respectivos
  const categoryIcons = {
    'Salary': Banknote,
    'Investment': ChartNoAxesCombined,
    'Business': BriefcaseBusiness,
    'Other Income': MoreHorizontal,
    'Food': Utensils,
    'Transport': Bus,
    'Fun': PartyPopper,
    'Study': BookOpenCheck,
    'Personal': User,
    'Games': Gamepad2,
    'Health': Heart,
    'Debt & Loans': BanknoteArrowDown,
    'Home': Home,
    'Gifts': Gift,
    'Urgency': AlertTriangle,
    'Other': MoreHorizontal,
  };

  // Seleccionar el icono correspondiente a la categoría o usar MoreHorizontal como predeterminado
  const Icon = categoryIcons[category] || MoreHorizontal;

  // Determinar la clase CSS basada en el tipo (Income o Expense)
  const ticketClass = type === 'Income' ? 'ticket income' : 'ticket expense';

  // Función para truncar texto si es muy largo
  const truncateText = (text, maxLength = 20) => {
    if (!text) return '';
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <section className={ticketClass}>
      <section className="ticketIconContainer">
        <Icon className="ticketIcon" size={24} />
      </section>

      <section className="ticketInfo">
        <h3 className="ticketName">{truncateText(name)}</h3>
        <p className="ticketDetails">{truncateText(details, 25)}</p>
      </section>

      <section className="ticketPrice">
        <h2>
          {type === 'Income' ? `+ $${Number(value).toLocaleString()}` : `- $${Number(value).toLocaleString()}`}
        </h2>
      </section>
    </section>
  );
};

export default Ticket;