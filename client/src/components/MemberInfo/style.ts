/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import memberBg from '../../assets/member_image.png';

export const MemberInfoWrapper = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	height: 80vh;
	width: 100vw;

	.memberinfoimg {
		background-image: url(${memberBg});
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		height: 30%;
		width: 30%;
	}

	.memberinfo {
		height: 30%;
		width: 50%;
	}

	.studentsinfo {
		width: 85%;
	}

	.student-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.student-item div {
		flex: 1;
		text-align: center;
	}
`;
