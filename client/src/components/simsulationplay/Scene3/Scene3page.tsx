import React, { useState, useEffect } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import { PhoneArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useRecoilValue } from 'recoil';
// import api from '../../../api';
import { CallGPT } from '../gpt/gpt';
import { userEmail } from '../../../store/RecoilState';
import CharacterDisplay from '../../CharacterDisplay';
import { Scene3Wrapper } from './style3';
import SimulationChat from '../SimulationChat/index';
import narr from '../../../assets/music/narr_3.mp3';
import wrongNarr from '../../../assets/music/narr_6.mp3';
import coach from '../../../assets/images/coach.png';
import coachNarr from '../../../assets/music/coach_3.mp3';
import coachNarr2 from '../../../assets/music/coach_6.mp3';

function Scene3page() {
	document.body.style.overflow = 'hidden';

	const [narrAudio] = useState(new Audio(narr));
	const [wrongNarrAudio] = useState(new Audio(wrongNarr));
	const [coachAudio] = useState(new Audio(coachNarr));
	const [coachAudio2] = useState(new Audio(coachNarr2));

	// 화면 첫번째 나레이션을 나타내고 없애주기 위한 변수
	const [firstNarr, setFirstNarr] = useState(true);
	// 화면 두번째 나레이션을 나타내고 없애주기 위한 변수
	const [secondNarr, setSecondNarr] = useState(true);
	// 친구에게 도달했을 때 상황을 나타내기 위한 변수
	const [arrived, setArrived] = useState(false);
	// 친구 모습을 확대하기 위한 변수
	const [zoom, setZoom] = useState(false);
	// 소방관 대화를 나타내기 위한 변수
	const [firefighter, setFirefighter] = useState(false);
	// stt 텍스트를 받기 위한 변수
	const [text, setText] = useState('');
	// const answer = '다리를 다쳐서 피가 많이 나요.';
	// 답변이 틀렸다는 것을 나타내기 위한 변수
	const [isWrong, setIsWrong] = useState(false);
	const memberEmail = useRecoilValue(userEmail);
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [hwsocket, setHWSocket] = useState<WebSocket | null>(null);
	const [left, setLeft] = useState(100);
	const [rightHandX, setRightHandX] = useState(0);
	const [rightHandY, setRightHandY] = useState(0);
	const [leftHandX, setLeftHandX] = useState(0);
	const [leftHandY, setLeftHandY] = useState(0);
	let imgleft = 100;

	// 웹소켓에서 메세지를 받고 그 메세지 값에 따라 다르게 실행하는 함수 설정
	function getMessage(message: string) {
		// 메세지를 mes 변수에 JSON 파싱한것을 변환
		const mes = JSON.parse(message);
		if (mes.type === 'narr') {
			narrAudio.play().catch((error) => console.log('자동 재생 실패:', error));
		}
		if (mes.type === 'text3') {
			setText(mes.content);
		}
		if (mes.type === 'wrong') {
			setIsWrong(true);
			wrongNarrAudio.play().catch((error) => console.log('자동 재생 실패:', error));
		}
	}

	useEffect(() => {
		const newSocket = new WebSocket('wss://littleplanet.kids:17777');

		newSocket.onopen = () => {
			console.log('WebSocket connection established.');
			setSocket(newSocket);
		};

		newSocket.onmessage = (event) => {
			getMessage(event.data);
		};

		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		const moveSocket = new WebSocket('wss://littleplanet.kids:17776');

		moveSocket.onopen = () => {
			console.log('WebSocket connection established.');
			setHWSocket(moveSocket);
		};

		// 소켓에 메시지 들어오면
		moveSocket.onmessage = (event) => {
			const eventMessage = JSON.parse(event.data);
			if (eventMessage.type === 'HW') {
				if (eventMessage.movedir === 'left') {
					imgleft -= 20;
					setLeft(imgleft);
				} else if (eventMessage.movedir === 'right') {
					imgleft += 20;
					setLeft(imgleft);
				}
				setRightHandX(Number(imgleft) + Number(eventMessage.righthandX));
				setRightHandY(340 - Number(eventMessage.righthandY));
				setLeftHandX(Number(imgleft) + Number(eventMessage.lefthandX));
				setLeftHandY(340 - Number(eventMessage.lefthandY));
			}
		};

		moveSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		// 컴포넌트가 렌더링되고 3초 뒤 첫번째 나레이션 자동으로 사라지게 하기

		coachAudio.play().catch((error) => console.log('자동 재생 실패:', error));
		coachAudio.onended = () => {
			setFirstNarr(false);
		};

		// setTimeout(() => {
		// 	setFirstNarr(false);
		// }, 3000);

		return () => {
			newSocket.close();
			moveSocket.close();
		};
	}, []);

	// 소켓이 등록되고 난 뒤 useEffect
	useEffect(() => {
		// 소켓이 있다면
		if (socket) {
			// 핸드세이크 메세지 설정 후 JSON 변환 후 보내기
			const handshakemessage = {
				type: 'web',
				email: memberEmail,
			};

			socket.send(JSON.stringify(handshakemessage));
		}
	}, [socket]); // socket가 변경될 때 : 즉 소켓에 설정한 링크로 변경 됐을 때 자동으로 실행

	// 소켓이 등록되고 난 뒤 useEffect
	useEffect(() => {
		// 소켓이 있다면
		if (hwsocket) {
			// 핸드세이크 메세지 설정 후 JSON 변환 후 보내기
			const handShake = {
				type: 'HW',
				email: memberEmail,
			};

			hwsocket.send(JSON.stringify(handShake));
		}
	}, [hwsocket]); // socket가 변경될 때 : 즉 소켓에 설정한 링크로 변경 됐을 때 자동으로 실행

	function handleTimer(time: number) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, time);
		});
	}

	useEffect(() => {
		async function handleAsyncOperations() {
			if (text) {
				const prompt = {
					role: 'user',
					content: `1. [GOAL] : The child must explain to the firefighter that his friend was injured on his leg. 2. [FIREFIGHTER'S QUESTION] : 친구가 어디를 다쳤나요? 3. [CHILD'S ANSWER] : ${text} ## Use the output in the JSON format. ##`,
				};

				const textLength = text.length;
				const animationTime = textLength * 0.05 * 1000 + 2000;

				try {
					const [timerResult, isCorrect] = await Promise.all([
						handleTimer(animationTime), // 글자 수에 맞춰서 타이머 설정
						CallGPT(prompt), // CallGPT 호출
					]);

					if (timerResult) {
						if (isCorrect) {
							const message = {
								type: 'page',
								content: 4,
							};
							socket?.send(JSON.stringify(message));
						} else {
							const message = {
								type: 'wrong',
							};
							setIsWrong(true);
							setText('');
							socket?.send(JSON.stringify(message));
						}
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
		handleAsyncOperations();
	}, [text]);

	// 친구에게 도달했을 때 실행되는 함수
	const arrive = () => {
		// 나레이션 발생
		coachAudio2.play().catch((error) => console.log('자동 재생 실패:', error));
		coachAudio2.onended = () => {
			setSecondNarr(false);
		};
		// 확대하기
		setZoom(true);
		// alert 띄우기
		setArrived(true);
		setTimeout(() => {
			// alert 끄기
			setArrived(false);
			// 소켓 있다면
			if (socket) {
				const message = { type: 'narr', content: '3' };
				// 3번 장면 소방관 나레이션 재생을 위해 앱으로 메세지 보내기
				socket.send(JSON.stringify(message));
				// 소방관 대화창 띄우기
				setFirefighter(true);
			}
		}, 3000);
	};

	useEffect(() => {
		if (rightHandX >= 875 && rightHandX <= 1025 && !zoom) {
			arrive();
		}
		if (leftHandX >= 875 && leftHandX <= 1025 && !zoom) {
			arrive();
		}
	}, [rightHandX, rightHandY, leftHandX, leftHandY]);

	// const sendNextPageMessage = () => {
	// 	const message = {
	// 		type: 'page',
	// 		content: 4,
	// 	};
	// 	if (socket) {
	// 		socket.send(JSON.stringify(message));
	// 	}
	// };

	return (
		<Scene3Wrapper>
			{/* <Button onClick={sendNextPageMessage}>NEXT</Button> */}
			<div className={`${zoom ? 'background-zoomed' : 'background-image'}`}>
				{firstNarr && (
					<div className="alert-container">
						<Alert>
							<div className="flex flex-row items-center">
								<img className="w-16 h-14 mr-2" src={coach} alt="하준이" />
								<Typography variant="h3" className="whitespace-nowrap">
									대단한데! 이제 친구가 어디를 다쳤는지 알려야 해. 친구에게 다가가볼까?
								</Typography>
							</div>
						</Alert>
					</div>
				)}
				{/* 구조물 터치하면 구조물 확대하고 터치된 구조물 seq로 touched 변경 */}
				{/* <Alert open={isTouched}> */}
				{arrived && secondNarr && (
					<Alert>
						<div className="flex flex-row items-center">
							<img className="w-16 h-14 mr-2" src={coach} alt="하준이" />
							<Typography variant="h3" className="whitespace-nowrap">
								친구가 어디를 다쳤는지 소방관에게 설명해줘!
							</Typography>
						</div>
					</Alert>
				)}
				{firefighter && !isWrong && (
					<SimulationChat chatNumber={text ? 2 : 1} text={text || '친구가 어디를 다쳤는지 말해줄래요?'} />
				)}
				{firefighter && isWrong && <SimulationChat chatNumber={text ? 2 : 1} text={text || '다시 한번 말해줄래요?'} />}
				{/* 소켓에서 받아온 메시지에 따라 isWrong 설정하고 스크립트 보여주기 */}
				{isWrong && (
					<div className="wrong-container">
						<Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
							<div className="flex flex-row m-3">
								<SparklesIcon className="w-10 h-10 mr-2" color="yellow" />
								<Typography variant="h3">이렇게 말해볼까?</Typography>
							</div>
							<div className="flex flex-row items-center m-2">
								<PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
								<Typography variant="h3">친구 다리에 피가 나요.</Typography>
							</div>
						</Alert>
					</div>
				)}
			</div>
			{zoom ? (
				<div style={{ position: 'absolute', left: `${left}px`, bottom: '0px', width: '640px', height: '480px' }}>
					<CharacterDisplay />
				</div>
			) : (
				<div style={{ position: 'absolute', left: `${left}px`, bottom: '50px', width: '640px', height: '480px' }}>
					<CharacterDisplay />
				</div>
			)}
			{zoom ? (
				<div />
			) : (
				<div
					style={{
						position: 'absolute',
						left: `875px`,
						bottom: '50px',
						width: '150px',
						height: '360px',
						backgroundColor: 'rgba( 255, 255, 255, 0 )',
					}}
				/>
			)}
		</Scene3Wrapper>
	);
}

export default Scene3page;
