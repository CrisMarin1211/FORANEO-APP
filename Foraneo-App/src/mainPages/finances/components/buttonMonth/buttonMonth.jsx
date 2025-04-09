import React from "react";
import { Calendar } from "lucide-react"; // Usa una librería de iconos
import "./buttonMonth.css";

const FloatingButton = () => {
  return (
    <button className="floating-button">
      <Calendar className="iconCalendar" size={25} color="white"/>
      <section className="text">
        <strong className="monthly">Monthly</strong>
        <p className="monthText">March, 2025</p>
      </section>
    </button>
  );
};

export default FloatingButton;
