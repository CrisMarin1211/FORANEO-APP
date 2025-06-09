import React from 'react';

import './toDoButton.css';
import { Link } from 'react-router-dom';

const ToDoButton= () => {
  return (
    <section className='todoButtonSection'>
      <Link to={'/to-do'} className='toDoButton'> To-Do! 📝</Link>
    </section>
  );
};

export default ToDoButton;
