import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	justify-contents: space-around;
	align-items: center;
	margin-left: 10%;

	.image-wrapper {
		position: relative;
		border: solid 2px #188eb7;
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

	.change-caracter {
		position: absolute;
		left: 90%;
		top: 45%;
	}

	.change-character2 {
		position: absolute;
		right: 90%;
		top: 45%;
	}
`;
