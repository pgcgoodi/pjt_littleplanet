import styled from 'styled-components';

export const CheckStepWrapper = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	text-align: center;

	.circle {
		background-color: #188eb7;
		border-radius: 100%;
		padding: 30px;
		width: 55px;
		height: 55px;
		color: #ffffff;
		font-size: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.message {
		margin: 20px;
		font-size: 35px;
		color: lightgray;
	}

	.active {
		color: black;
	}
`;
