import React from 'react';
import { useNavigate } from 'react-router-dom';
import './add.css';
import AddSection from '../../../finances/components/addSection/addSection';
import ValueInput from '../../components/valueInput/valueInput';
import { ChevronLeft } from 'lucide-react';
import Menu from '../../../Planner/components/navBar/navBar';

const Add = () => {
	const navigate = useNavigate();

	return (
		<section className='Addcontainer'>
			<ChevronLeft className='backIcon' onClick={() => navigate('/finances')} />

			<AddSection />
			<section className='spaceiwi'></section>
			<Menu></Menu>
		</section>
	);
};

export default Add;
