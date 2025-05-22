import React from 'react';
import './ticketModal.css';

import {
  Banknote, ChartNoAxesCombined, BriefcaseBusiness, MoreHorizontal, Utensils, Bus,
  PartyPopper, BookOpenCheck, User, Gamepad2, Heart, BanknoteArrowDown,
  Home, Gift, AlertTriangle
} from 'lucide-react';

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

const TicketModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  const Icon = categoryIcons[ticket.category] || MoreHorizontal;

  return (
    <section className="modal-overlay" onClick={onClose}>
      <section className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="claseclose-btn" onClick={onClose}>❌</h2>

        <section className={`ticket ticket-modal ${ticket.type === 'Income' ? 'income' : 'expense'}`}>
          <section className="ticket-modal-icon">
            <Icon size={32} />
          </section>

          <section className="ticket-modal-content">
            <section className="ticket-modal-row">
              <span className="ticket-modal-label">Name:</span>
              <span>{ticket.name}</span>
            </section>

            <section className="ticket-modal-row">
              <span className="ticket-modal-label">Category:</span>
              <span>{ticket.category}</span>
            </section>


            <section className="ticket-modal-row">
              <span className="ticket-modal-label">Precio:</span>
              <span>${ticket.value}</span>
            </section>

            <section className="ticket-modal-row ticket-modal-details">
              <span className="ticket-modal-label">Detalles:</span>
              <p>{ticket.details}</p>
            </section>

            <section className="ticket-modal-row">
              <span className="ticket-modal-label">Fecha:</span>
              <span>{new Date(ticket.date).toLocaleDateString()}</span>
            </section>


          </section>
        </section>
      </section>
    </section>
  );
};

export default TicketModal;
