import styled from 'styled-components';
import loadingImage from 'assets/images/livecam_app.png';

export const Wrapper = styled.div`
	display: flex;
	justify-contents: space-around;
	align-items: center;
	margin-left: 10%;

	.image-wrapper {
		background-image: url(${loadingImage});
		background-repeat: no-repeat;
		position: relative;
		background-position: center;
		border: solid 2px #188eb7;
		border-radius: 10px;
		margin: 20px;
		width: 640px;
		height: 480px;
	}
`;
