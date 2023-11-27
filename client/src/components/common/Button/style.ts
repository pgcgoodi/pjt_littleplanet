/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ButtonWrapper = styled.button`
	background-color: #faff00;
	color: black;
	border: none;
	padding: 12px 24px;
	border-radius: 40px;
	cursor: pointer;
	transition: background-color 0.3s;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: #188eb7;
		color: white;
	}
`;
