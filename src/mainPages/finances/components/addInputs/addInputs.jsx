
import React from 'react';
import { Input } from 'antd';
import './AddInputs.css';

const { TextArea } = Input;

const AddInputs = ({ setName, setDetails, name, details }) => {
  return (
    <section>

      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Expense Name"
        className="input-style"
      />


      <TextArea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Enter Details"
        autoSize={{ minRows: 3, maxRows: 5 }}
        className="text-area-style" 
      />
    </section>
  );
};

export default AddInputs;