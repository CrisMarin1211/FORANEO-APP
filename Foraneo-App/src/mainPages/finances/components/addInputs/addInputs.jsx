
import React from 'react';
import { Input } from 'antd';
import './AddInputs.css'; // Import the CSS file

const { TextArea } = Input;

const AddInputs = ({ setName, setDetails, name, details }) => {
  return (
    <section>
      {/* Campo para el nombre */}
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)} // Actualiza el nombre
        placeholder="Expense Name"
        className="input-style" // Apply input styles
      />

      {/* Campo para los detalles */}
      <TextArea
        value={details}
        onChange={(e) => setDetails(e.target.value)} // Actualiza los detalles
        placeholder="Enter Details"
        autoSize={{ minRows: 3, maxRows: 5 }}
        className="text-area-style" // Apply text area styles
      />
    </section>
  );
};

export default AddInputs;