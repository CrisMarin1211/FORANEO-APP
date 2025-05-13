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
					<Link className='btn' to='/finances'>
						<IconMoney />
					</Link>
					<Link className='btn' to='/welcome'>
						<IconFood />
					</Link>
					<section className='main'>
						<Link className='btn home' to='/'>
							<IconHome />
						</Link>
					</section>
					<Link className='btn' to='/calendar'>
						<IconCalendar />
					</Link>
					<Link className='btn' to='/profile'>
						<IconUser />
					</Link>
				</nav>
			</section>
		</>
	);
};

export default Menu;
