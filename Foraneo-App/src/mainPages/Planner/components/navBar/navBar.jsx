import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';
import IconMoney from '../../assets/icons/iconMoney';
import IconFood from '../../assets/icons/iconFood';
import IconHome from '../../assets/icons/iconHome';
import IconCalendar from '../../assets/icons/iconCalendar';
import IconUser from '../../assets/icons/iconUser';

const Menu = () => {
	return (
		<>
			<section>
				<nav className='menu'>
					<button className='btn'>
						<IconMoney />
					</button>
					<button className='btn'>
						<IconFood />
					</button>
					<section className='home-container'>
						<Link className='btn home' to='/'>
							<IconHome />
						</Link>
					</section>
					<Link className='btn' to='/calendar'>
						<IconCalendar />
					</Link>
					<Link className='btn' to='/'>
						<IconUser />
					</Link>
				</nav>
			</section>
		</>
	);
};

export default Menu;
