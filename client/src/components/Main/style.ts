/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
// import mainBg from 'assets/images/main_image.png';

export const MainWrapper = styled.div`
	.bgimage {
		background-image: url(https://littleplanet.s3.ap-northeast-2.amazonaws.com/image/maingif.gif);
		height: 500px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}
	.main-div {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		color: white;
		margin-right: 4rem;
	}
	.main-text {
		font-size: 5rem;
		font-weight: bold;
		padding: 0rem 0rem 3rem 0rem;
	}
	.sub-text {
		font-size: 2.5rem;
	}
`;
