/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavBarWrapper = styled.div`
	.nav-container {
		/* font-family: 'GowunDodum-Regular'; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		padding: 0rem 2rem;
		color: black;
	}

	.nav-container h1 {
		font-size: 1.5vw;
	}

	.nav-container ul {
		list-style: none;
		display: flex;
		margin: 0px;
	}

	.nav-container li {
		cursor: pointer;
		transition: color 0.3s ease;
		margin: 2rem;
		font-size: 1.5rem;
	}

	.nav-container li:hover {
		color: #188eb7;
	}

	.main_logo img {
		width: 100px;
		height: auto;
	}
`;

export const NavBarLink = styled(NavLink)`
	text-decoration: none;
	color: black;
	&.active {
		color: #188eb7; // 활성화된 링크의 색상
		font-weight: bold;
	}
`;
