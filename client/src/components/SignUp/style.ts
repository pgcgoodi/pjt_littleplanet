/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const SignUpWrapper = styled.div`
	.signup-form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 20px;
	}
	.form-group {
		align-items: center;
	}
	.input-button-group {
		display: flex;
		align-items: center;
		column-gap: 10px; /* 열 사이의 간격 */
	}

	.input-button-group .btn-verify {
		border-radius: 10px;
		white-space: nowrap;
		text-align: center;
		padding: 10px;
		background-color: #188eb7;
	}
`;
