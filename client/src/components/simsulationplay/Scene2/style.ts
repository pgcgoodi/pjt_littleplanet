import styled, { keyframes } from 'styled-components';
import background from 'assets/images/background.png';

const loop = keyframes`    
	0%{
		top:0px;
		left:-400px;
	}
	50%{
		top:0px;
		left:400px;
	}
	100%{
		top:0px;
		left:-400px;    
	}
`;

export const Scene2Wrapper = styled.div`
	.background-image {
		background-image: url(${background});
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		width: 100%;
		height: 100vh;
	}

	.alert-container {
		position: absolute;
		bottom: 65%;
		right: 30%;
	}

	.wrong-container {
		position: absolute;
		top: 35%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.left-right {
		position: relative;
		animation: ${loop} 10s 1;
	}

	.zoom {
		transform: scale(1);
		transition: transform 1s;
	}
`;
