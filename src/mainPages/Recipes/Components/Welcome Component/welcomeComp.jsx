import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlanYet from '../PlanYetPhrase/PlanYetPhrase';
import Title from '../TitleWelcome/TitleWelcome';
import ImageSad from '../imageSad/imageSad';
import ButtonCreatePlan from '../ButtonCreatePlan/ButtonCreatePlan';
import './welcomeComp.css';

function WelcomeNoData() {
  const navigate = useNavigate();

  const handleCreatePlanClick = () => {
    navigate('/plancreate');
  };

  return (
    <section className='container-welcome'>
      <section className='tittle-welcome'>
        <Title />
      </section>
      <ImageSad />
      <PlanYet />
      <ButtonCreatePlan onClick={handleCreatePlanClick} />
    </section>
  );
}

export default WelcomeNoData;
