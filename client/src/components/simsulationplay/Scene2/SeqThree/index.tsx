import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Typography, Alert } from '@material-tailwind/react';
import { PhoneArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import SimulationChat from 'components/simsulationplay/SimulationChat';
import { useRecoilValue } from 'recoil';
import { userEmail } from 'store/RecoilState';
import narration from 'assets/music/narr_2.mp3';
import wrongNarration from 'assets/music/narr_6.mp3';
import coach5Narr from 'assets/music/coach_5.mp3';
import { CallGPT } from '../../gpt/gpt';
import { SeqThreeWrapper } from './style';

interface ISeqThreeProps {
	setStep: Dispatch<SetStateAction<number>>;
	setStatus: Dispatch<SetStateAction<number>>;
	address: string;
}

function SeqThree(props: ISeqThreeProps) {
	document.body.style.overflow = 'hidden';

	const { address, setStep, setStatus } = props;

	const [narrAudio] = useState(new Audio(narration));
	const [wrongNarrAudio] = useState(new Audio(wrongNarration));
	const [coachAudio] = useState(new Audio(coach5Narr));

	const [socket, setSocket] = useState<WebSocket | null>(null);

	const [alert, setAlert] = useState(true);

	// 사용자 음성 받아오기
	const [text, setText] = useState('');

	// 사용자의 음성이 틀렸을 경우
	const [isWrong, setIsWrong] = useState(false);
	const [wrongSeq, setWrongSeq] = useState(false);

	const memberEmail = useRecoilValue(userEmail);

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
			if (eventMessage.type === 'text2') {
				setText(eventMessage.content);
			}
			if (eventMessage.type === 'wrong') {
				setWrongSeq(true);
				wrongNarrAudio.play().catch((error) => console.log('자동 재생 실패:', error));
			}
			if (eventMessage.type === 'narr') {
				narrAudio.play().catch((error) => console.log('자동 재생 실패:', error));
			}
			if (eventMessage.type === 'address') {
				console.log(eventMessage.content);
			}
		};

		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		coachAudio.play().catch((error) => console.log('자동 재생 실패:', error));
		coachAudio.onended = () => {
			setAlert(false);
			newSocket.send(JSON.stringify({ type: 'narr', content: 2 }));
		};

		return () => {
			newSocket.close();
		};
	}, []);

	// 3. GPT
	// 응답 시 화면에 띄워지는 시간
	function handleTimer(time: number) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, time);
		});
	}

	const testClick = () => {
		setStatus(3);
		setStep(4);
	};

	useEffect(() => {
		async function handleAsyncOperations() {
			if (text) {
				const prompt = {
					role: 'user',
					content: `1. [GOAL] : The child must convey their current location(that is ${address}) to the firefighters. 2. [FIREFIGTER'S QUESTION] : 친구가 있는 위치를 말해줄래요? 3. [CHILD'S ANSWER] : ${text} ## Use the output in the JSON format. ##`,
				};

				const textLength = text.length;
				const animationTime = textLength * 0.05 * 1000 + 2000;

				try {
					const [timerResult, isCorrect] = await Promise.all([handleTimer(animationTime), CallGPT(prompt)]);

					if (timerResult) {
						if (isCorrect) {
							const message = {
								type: 'page',
								content: 3,
							};
							socket?.send(JSON.stringify(message));
						} else {
							setIsWrong(true);
							setText('');
							setTimeout(() => {
								socket?.send(JSON.stringify({ type: 'wrong' }));
							}, 3000);
						}
					}
				} catch (e) {
					testClick();
					console.log(e);
				}
			}
		}

		handleAsyncOperations();
	}, [text]);

	useEffect(() => {
		let alertTimer: any;

		if (isWrong) {
			alertTimer = setTimeout(() => {
				setIsWrong(false);
			}, 3000);
		}
		return () => {
			if (alertTimer) clearTimeout(alertTimer);
		};
	}, [isWrong]);

	// const sendNextPageMessage = () => {
	// 	const message = {
	// 		type: 'page',
	// 		content: 3,
	// 	};
	// 	if (socket) {
	// 		socket.send(JSON.stringify(message));
	// 	}
	// };

	return (
		<SeqThreeWrapper>
			{/* <Button onClick={sendNextPageMessage}>NEXT</Button> */}
			{alert && (
				<div className="alert-container">
					<Alert>
						<Typography variant="h3">확인한 위치를 소방관에게 알려줘!</Typography>
					</Alert>
				</div>
			)}
			{!alert && !isWrong && !wrongSeq && (
				<SimulationChat chatNumber={text ? 2 : 1} text={text || '다친 친구가 있는 주소를 알려줄래요?'} />
			)}
			{isWrong && (
				<div className="wrong-container">
					<Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
						<div className="flex flex-row m-3">
							<SparklesIcon className="w-10 h-10 mr-2" color="yellow" />
							<Typography variant="h3">이렇게 말해볼까?</Typography>
						</div>
						{address === '소행성로' ? (
							<div className="flex flex-row items-center">
								<PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
								<Typography variant="h5">여기는 소행성로 203 근처에요.</Typography>
							</div>
						) : (
							<div className="flex flex-row items-center m-3">
								<PhoneArrowUpRightIcon className="w-7 h-7 mr-2" />
								<Typography variant="h5">여기는 삼성스토어 소행성지점 근처에요.</Typography>
							</div>
						)}
					</Alert>
				</div>
			)}
			{!alert && !isWrong && wrongSeq && (
				<SimulationChat chatNumber={text ? 2 : 1} text={text || '다시 한번 말해볼래요?'} />
			)}
		</SeqThreeWrapper>
	);
}

export default SeqThree;
