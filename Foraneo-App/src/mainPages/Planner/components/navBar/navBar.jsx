import React from 'react';
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
						<IconMoney width={30} height={30} />
					</button>
					<button className='btn'>
						<IconFood width={30} height={30} />
					</button>
					<div className='home-container'>
						<button className='btn home'>
							<IconHome width={30} height={30} />
						</button>
					</div>
					<button className='btn'>
						<IconCalendar width={30} height={30} />
					</button>
					<button className='btn'>
						<IconUser width={30} height={30} />
					</button>
				</nav>
			</section>
		</>
	);
};

export default Menu;
