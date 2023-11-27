/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SimulationWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.simulation-item {
		display: flex;
		padding: 20px 20px;
	}
	.simulation-img img {
		width: 300px;
		height: auto;
		padding: 0px 20px 0px 20px;
	}
	.simulation-data {
		width: 500px;
		padding: 0px 20px 0px 20px;
	}
	.simulation-data p {
		padding: 0px;
		margin: 0px;
	}
	.need {
		margin-top: 10px;
	}
	h2 {
		margin-top: 0px;
	}
	.info p {
		font-size: 2rem;
		padding: 0px 0px 0px 30px;
	}
	span.colored {
		color: #188eb7;
	}
	.btn-div-detail {
		margin: 10px;
	}
	.btn-div-play {
		margin: 10px;
	}
`;

export const SimulationLink = styled(NavLink)`
	text-decoration: none;
	}`;

export const SimulationDetailWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.simulation-item {
		// display: flex;
		padding-top: 20px;
	}
	.simulation-detail-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}
	.simulation-img img {
		width: 300px;
		height: auto;
		padding: 0px 20px 0px 0px;
	}
	.simulation-data {
		width: 500px;
		padding: 0px 20px 0px 20px;
	}
	.description {
		padding: 0px;
		margin: 0px;
	}
	// .simulation-data need {
	// 	padding: 0px;
	// 	margin-top: 10px;
	// }
	.need {
		margin-top: 10px;
		font-weight: bold;
		font-size: 1.3rem;
	}
	h2 {
		margin-top: 0px;
	}
	.detail-info p {
		font-size: 2rem;
		font-weight: bold;
		padding: 0px 0px 30px 0px;
	}
	span.colored {
		color: #188eb7;
	}
	.btn-div-detail {
		margin: 10px;
	}
	.btn-div-play {
		display: flex;
		flex-direction: column;
		margin: 10px;
		align-items: ceter;
		justify-content: center;
	}
	.detail-text {
		margin: 10px;
	}
	detail-img {
		margintop: 50px;
	}
`;

export const SimulationMainWrapper = styled.div`
	@keyframes marquee {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(-100%);
		}
	}

	.marquee {
		animation: marquee 20s linear infinite;
		transition: animation-play-state 1s ease;
	}
	.marquee:hover {
		animation-play-state: paused;
	}
	.main-container {
		margin: 40px 0px 40px 0px;
	}
	.main-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.main-info p {
		font-size: 2rem;
		font-weight: bold;
		// padding: 30px 0px 0px 30px;
	}
	.main-sims {
		display: flex;
		white-space: nowrap;
	}
	.main-sims:hover .marquee {
		animation-play-state: paused;
	}
	.main-simulation-item {
		flex-shrink: 0;
		margin-right: 20px;
	}
	.main-simulation-img img {
		width: 300px;
		height: auto;
		padding: 0px 20px 0px 20px;
	}

	.main-btn-div-detail {
		margin: 10px;
	}
	// .main-simulation-img {
	// 	position: relative;
	// 	overflow: hidden;
	// }

	// .main-simulation-img:hover .overlay {
	// 	display: block;
	// }

	// .overlay {
	// 	position: absolute;
	// 	top: 0;
	// 	left: 0;
	// 	right: 0;
	// 	bottom: 0;
	// 	background: rgba(0, 0, 0, 0.5);
	// 	display: none;
	// 	justify-content: center;
	// 	align-items: center;
	// 	color: white;
	// }
`;
