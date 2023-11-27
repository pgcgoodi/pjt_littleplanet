import React from 'react';
import { ButtonWrapper } from './style';

interface IButtonProps {
	text: string;
	handleClick: () => void;
}

function Button(props: IButtonProps) {
	const { text, handleClick } = props;
	return <ButtonWrapper onClick={handleClick}>{text}</ButtonWrapper>;
}

export default Button;
