import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const AddInputs = ({ setName, setDetails, name, details }) => {
  return (
    <section>
      {/* Campo para el nombre */}
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)} // Actualiza el nombre
        placeholder="Enter the name"
        style={{ marginBottom: '16px' }}
      />

      {/* Campo para los detalles */}
      <TextArea
        value={details}
        onChange={(e) => setDetails(e.target.value)} // Actualiza los detalles
        placeholder="Enter the details"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </section>
  );
};

export default AddInputs;
