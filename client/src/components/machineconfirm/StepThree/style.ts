import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	justify-contents: space-around;
	align-items: center;
	margin-left: 10%;

	.image-wrapper {
		position: relative;
		border-radius: 10px;
		margin: 20px;
		width: 640px;
		height: 480px;
		display: flex;
	}

	.loading {
		align-items: center;
		justify-content: center;
	}

	.loading-image {
		height: 480px;
		width: 600px;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}
`;
