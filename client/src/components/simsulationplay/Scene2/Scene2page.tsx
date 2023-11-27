import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import { userEmail } from 'store/RecoilState';
import { Scene2Wrapper } from './style';
import SeqOne from './SeqOne';
import SeqTwo from './SeqTwo';
import SeqThree from './SeqThree';
import Scene2Layout from './Scene2Layout';

interface IScene2pageProps {
	setStatus: Dispatch<SetStateAction<number>>;
}

// #Scene2. <여기 위치는요>
function Scene2page(props: IScene2pageProps) {
	document.body.style.overflow = 'hidden';

	const { setStatus } = props;
	// 시퀀스별 초기 설정
	const [step, setStep] = useState(0);
	const [stepView, setStepView] = useState(<div />);

	const [address, setAddress] = useState('');

	// useEffect를 통해 switch문으로 각 컴포넌트를 보여준다.
	useEffect(() => {
		switch (step) {
			case 0: {
				setStepView(<SeqOne setStep={setStep} />);
				break;
			}
			case 1: {
				setStepView(<SeqTwo setStep={setStep} setAddress={setAddress} />);
				break;
			}
			case 2: {
				setStepView(<SeqThree setStep={setStep} setStatus={setStatus} address={address} />);
				break;
			}
			default: {
				setStepView(<div>잠시만 기다려주세요! 컨텐츠를 로딩중입니다.</div>);
			}
		}
	}, [step]);

	const memberEmail = useRecoilValue(userEmail);

	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		// 소켓 연결 부분(ip주소 및 배포주소)
		const newSocket = new WebSocket('wss://littleplanet.kids:17777');

		newSocket.onopen = () => {
			setSocket(newSocket);
			const handshake = {
				type: 'web',
				email: memberEmail,
			};
			newSocket.send(JSON.stringify(handshake));
		};

		// 받아온 메시지는 사용자 답변의 정답 여부
		newSocket.onmessage = (event) => {
			const eventMessage = JSON.parse(event.data);
			if (eventMessage.type === 'address') {
				setAddress(eventMessage.content);
				socket?.send(JSON.stringify({ type: 'correct' }));
			}
		};

		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		return () => {
			newSocket.close();
		};
	}, []);

	return (
		<Scene2Wrapper>
			<div className="background-image">
				<Scene2Layout StepView={stepView} />
			</div>
		</Scene2Wrapper>
	);
}

export default Scene2page;
