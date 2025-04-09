import React from 'react';
import { useNavigate } from 'react-router-dom';  // Asegúrate de importar useNavigate
import './Add.css';
import AddSection from '../../components/AddSection/addSection';
import ValueInput from '../../components/valueInput/valueInput';
import { ChevronLeft } from 'lucide-react';

const Add = () => {
  const navigate = useNavigate();  // Inicializamos el hook de navegación

  return (
    <section className='Addcontainer'>

        <ChevronLeft className='backIcon' onClick={() => navigate('/finances')}/>
      
      <AddSection />
    </section>
  );
};

export default Add;
