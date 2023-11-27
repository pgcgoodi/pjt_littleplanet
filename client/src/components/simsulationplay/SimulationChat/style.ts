/* eslint-disable import/prefer-default-export */
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const popIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SimulationChatWrapper = styled.div`
	.ch1 {
		display: flex;
		align-items: center;
		padding: 20px;
		margin-left: 3rem;
	}

	.ch2 {
		display: flex;
		align-items: center;
		padding: 20px;
		margin-right: 5rem;
	}

	.ch3 {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 20px;
	}

	.icon {
		position: relative;
		overflow: hidden;
		width: 150px;
		height: 150px;
		border-radius: 50%;
		background-color: #eee;
	}

	.ch2-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background-color: white;
		font-size: 35px;
	}

	.textbox {
		white-space: pre-wrap;
		position: relative;
		display: inline-block;
		max-width: calc(100% - 70px);
		padding: 20px;
		font-size: 35px;
		border-radius: 10px;
	}

	.textbox::before {
		position: absolute;
		display: block;
		top: 0;
		font-size: 1.5rem;
	}

	.ch1 .textbox {
		margin-left: 20px;
		background-color: white;
		animation: ${fadeIn} 1s ease-out;
	}

	.ch1 .textbox::before {
		left: -15px;
		content: '◀';
		color: white;
	}

	.ch2 {
		flex-direction: row-reverse;
	}

	.ch2 .textbox {
		margin-right: 20px;
		background-color: #f9eb54;
		animation: ${fadeIn} 1s ease-out;
	}

	.ch2 .textbox::before {
		right: -15px;
		content: '▶';
		color: #f9eb54;
	}

	.ch3 .textbox {
		margin-left: 20px;
		background-color: white;
		animation: ${fadeIn} 1s ease-out;
	}

	.letter {
		display: inline-block;
		opacity: 0;
		transform: translateY(-10px);
		animation: ${popIn} 2s forwards;
	}
`;
