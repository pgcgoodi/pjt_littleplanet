import styled, { keyframes } from 'styled-components';

const loop = keyframes`    
	0%{
        transform: scale(1.5);
        transition: transform 1s;
		top:0px;
		left:-380px;
	}
	50%{
        transform: scale(1.5);
		top:0px;
		left:380px;
	}
	100%{
        transform: scale(1.5);
		top:0px;
		left:-380px;    
	}
`;

export const SeqOneWrapper = styled.div`
	.alert-container {
		position: absolute;
		bottom: 65%;
		right: 30%;
	}

	:is(.left-right .original) {
		animation-fill-mode: forwards;
	}

	.left-right {
		position: relative;
		animation: ${loop} 10s 1;
		animation-delay: 2s;
	}

	.original {
		transform: scale(1);
		transition: transform 1s;
	}
`;
