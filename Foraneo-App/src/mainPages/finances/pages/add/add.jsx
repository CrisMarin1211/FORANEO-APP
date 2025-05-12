import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Add.css';
import AddSection from '../../../finances/components/addSection/addSection';
import ValueInput from '../../components/valueInput/valueInput';
import { ChevronLeft } from 'lucide-react';

const Add = () => {
  const navigate = useNavigate();

  return (
    <section className='Addcontainer'>

        <ChevronLeft className='backIcon' onClick={() => navigate('/finances')}/>

      <AddSection />
    </section>
  );
};

export default Add;
