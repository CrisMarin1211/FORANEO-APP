import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faFrown, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

export const emotionsData = [
	{ name: 'Happy', icon: <FontAwesomeIcon icon={faSmile} /> },
	{ name: 'Sad', icon: <FontAwesomeIcon icon={faFrown} /> },
	{ name: 'Love', icon: <FontAwesomeIcon icon={faHeart} /> },
	{ name: 'Star', icon: <FontAwesomeIcon icon={faStar} /> },
];
