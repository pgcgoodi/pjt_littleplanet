/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import outrobgimg1 from '../../../assets/images/outrobackground1.png';
import outrobgimg2 from '../../../assets/images/outrobackground2.png';

export const Scene5Wrapper = styled.div`
	background-image: url(${outrobgimg1});
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;
	width: 100vw;
	height: 100vh;
	.btn-style {
		margin-top: 50px;
	}
`;
export const Bg2Wrapper = styled.div`
	background-image: url(${outrobgimg2});
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;
	width: 100vw;
	height: 100vh;
	.btn-style {
		margin-top: 50px;
	}
	@keyframes marquee {
		from {
			bottom: -100%; /* 시작 위치를 화면 아래로 설정 */
		}
		to {
			bottom: 100%; /* 종료 위치를 화면 위로 설정 */
			visibility: hidden;
		}
	}

	.marquee {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%); /* 중앙 정렬 */
		background-color: black;
		color: white;
		// width: 300px;
		padding: 20px;
		white-space: pre-line; /* 줄바꿈과 공백 처리 */
		animation: marquee 15s linear;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
		overflow: hidden;
	}

	/* 화면 밑에서 시작하도록 설정 */
	.marquee::before {
		content: '';
		display: block;
		height: 100vh; /* 화면 높이만큼의 공간 */
		position: absolute;
		top: -100vh;
		left: 0;
		right: 0;
	}
`;
