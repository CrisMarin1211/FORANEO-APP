import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';
import IconMoney from '../../assets/icons/iconMoney';
import IconFood from '../../assets/icons/iconFood';
import IconHome from '../../assets/icons/iconHome';
import IconCalendar from '../../assets/icons/iconCalendar';
import IconUser from '../../assets/icons/iconUser';

import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Menu = () => {
  const [hasWeeklyPlan, setHasWeeklyPlan] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyPlan = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          setHasWeeklyPlan(false);
          setLoading(false);
          return;
        }

        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setHasWeeklyPlan(!!data.weeklyPlan);
        } else {
          setHasWeeklyPlan(false);
        }
      } catch (error) {
        console.error('Error al obtener weekly plan:', error);
        setHasWeeklyPlan(false);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyPlan();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <section>
      <nav className='menu'>
       <svg
  className='menu-bg-svg'
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 393 96"
  fill="none"
  aria-hidden="true"
  focusable="false"
>
  <path
    d="M122.688 1.9707H0V96.4708H393V1.97077H268.816C252.857 1.97077 243.381 2.47097 232.409 17.971C221.811 32.9417 214.454 45.4708 197.996 45.4708C181.538 45.4708 171.578 36.1478 161.09 19.9711C150.602 3.79439 136.154 1.97074 122.688 1.9707Z"
    fill="#02565F"
    stroke="#02565F"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>


        <div className='menu-inner'>
          <Link className='btn' to='/finances'><IconMoney /></Link>
          <Link className='btn' to={hasWeeklyPlan ? '/weeklyplan' : '/welcome'}><IconFood /></Link>
          <section className='main'>
            <Link className='btn home' to='/main'><IconHome /></Link>
          </section>
          <Link className='btn' to='/calendar'><IconCalendar /></Link>
          <Link className='btn' to='/profile'><IconUser /></Link>
        </div>
      </nav>
    </section>
  );
};

export default Menu;
