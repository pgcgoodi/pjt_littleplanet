/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import background from '../../../assets/images/background.png';
import wrongbackground from '../../../assets/images/wrongbackground.png';

export const Scene1Wrapper = styled.div`
	background-image: url(${background});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	width: 100%;
	height: 100vh;

	.alert-container {
		position: absolute;
		bottom: 65%;
		right: 20%;
	}
`;

export const WrongWrapper = styled.div`
	background-image: url(${wrongbackground});
	background-size: cover;
	background-position: top;
	background-repeat: no-repeat;
	height: 100vh;
	width: 100vw;

	.wrong-container {
		position: absolute;
		top: 12%;
		left: 25%;
		transform: translate(-50%, -50%);
	}
`;
