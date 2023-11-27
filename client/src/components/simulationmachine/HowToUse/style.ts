/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Wrapper = styled.div`
	margin: 3rem;

	.background {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.boxes {
		display: flex;
		justify-content: space-between;
		gap: 50px;
	}

	.box {
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		cursor: pointer;
		margin: 1.5rem;
		width: 220px;
		height: 220px;
		background-color: #f8f8f8;
		font-weight: bold;
		font-size: 20px;
		text-align: center;
		border-radius: 10px;
	}

	img {
		justify-content: center;
		width: 170px;
		height: 170px;
	}

	.box.active {
		opacity: 0.8;
		background-color: #188eb7;
		color: white;
	}

	.box.active img {
		opacity: 0.15;
	}

	.box.active .box-name {
		opacity: 0.15;
	}

	.description {
		position: absolute;
		color: black;
		font-size: 20px;
		display: flex;
		justify-content: center;
		text-align: center;
		padding: 10px;
	}
`;
