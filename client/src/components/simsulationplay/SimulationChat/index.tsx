import React from 'react';
import { useRecoilValue } from 'recoil';
import { SimulationChatWrapper } from './style';
import firefighter from '../../../assets/images/firefighter.png';
import { studentName } from '../../../store/RecoilState';

// import realman from '../../../assets/images/realman.png';

interface SimulationChatProps {
	chatNumber: number;
	text: string;
}

function SimulationChat({ chatNumber, text }: SimulationChatProps) {
	const student = useRecoilValue(studentName);

	// 글자를 분할하고 각 글자에 span을 적용하는 함수입니다.
	const renderText = (textToRender: string) => {
		return textToRender.split('').map((char, index) => (
			// eslint-disable-next-line react/no-array-index-key
			<span key={`letter-${char}-${index}`} className="letter" style={{ animationDelay: `${index * 0.05}s` }}>
				{char}
			</span>
		));
	};

	return (
		<SimulationChatWrapper>
			{chatNumber === 1 && (
				<div className="ch1">
					<img className="icon" src={firefighter} alt="소방관" />
					<div className="textbox">{renderText(text)}</div>
				</div>
			)}
			{chatNumber === 2 && (
				<div className="ch2">
					<div className="ch2-icon">{student}</div>
					<div className="textbox">{renderText(text)}</div>
				</div>
			)}
			{chatNumber === 3 && (
				<div className="ch3">
					<div className="textbox">{renderText(text)}</div>
				</div>
			)}
		</SimulationChatWrapper>
	);
}

export default SimulationChat;
