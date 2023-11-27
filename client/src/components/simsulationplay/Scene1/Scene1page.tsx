import React, { useState, useEffect } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import { PhoneArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useRecoilValue } from 'recoil';
import { CallGPT } from '../gpt/gpt';
import { userEmail } from '../../../store/RecoilState';
import { Scene1Wrapper, WrongWrapper } from './style';
import SimulationChat from '../SimulationChat/index';
import CharacterDisplay from '../../CharacterDisplay/index';
import narr from '../../../assets/music/narr_1.mp3';
import wrongNarr from '../../../assets/music/narr_6.mp3';
import coach from '../../../assets/images/coach.png';
import coachNarr from '../../../assets/music/coach_1.mp3';
import coachWrongNarr from '../../../assets/music/coach_1_wrong.mp3';

// 친구가 다쳤어요.
function Scene1page() {
	document.body.style.overflow = 'hidden';

	const [narrAudio] = useState(new Audio(narr));
	const [wrongNarrAudio] = useState(new Audio(wrongNarr));
	const [coachAudio] = useState(new Audio(coachNarr));
	const [coachWrong] = useState(new Audio(coachWrongNarr));

	// 지시문 Alert 5초 타이머 걸기 위함
	const [showAlert, setShowAlert] = useState(true);

	// 캐릭터 이동시키기
	const [left, setLeft] = useState(500);
	const handleLeft = () => setLeft((prevLeft) => prevLeft - 20);
	const handleRight = () => setLeft((prevLeft) => prevLeft + 20);

	// 2. 소켓
	// 소켓 통신을 위한 메일 받아오고, 소켓 관련 초기 설정하기
	const memberEmail = useRecoilValue(userEmail);
	const [socket, setSocket] = useState<WebSocket | null>(null);

	// 소켓 통해 app에서 받아오는 사용자 음성 저장하기
	const [text, setText] = useState('');

	// 오답 시 배경 바꾸고, alert 띄우고, 정답 script 보여주기.
	const [isWrong, setIsWrong] = useState(false);
	const [wrongAlert, setWrongAlert] = useState(false);
	const answer = '친구가 높은 곳에서 뛰어내려서 많이 다쳤어요.';

	// 오답이라면 소방관과의 대화도 변경되어야 함.
	const [wrongSignal, setWrongSignal] = useState(false);

	// 처음 틀리면 배경 변경하기 위해
	const [fail, setFail] = useState(false);

	// 처음 컴포넌트가 마운트되면,
	useEffect(() => {
		// asset 불러오고

		// 소켓 연결
		const newSocket = new WebSocket('wss://littleplanet.kids:17777');

		// 소켓 열리면
		newSocket.onopen = () => {
			// useEffect 바깥에서도 socket 사용하기 위해 setSocket(newSocket)하고 메일 보내두기
			setSocket(newSocket);
			const handShake = {
				type: 'web',
				email: memberEmail,
			};
			newSocket.send(JSON.stringify(handShake));
		};

		// 소켓에 메시지 들어오면
		newSocket.onmessage = (event) => {
			const eventMessage = JSON.parse(event.data);
			// 타입 확인 후 setText
			if (eventMessage.type === 'text1') {
				setText(eventMessage.content);
			}
			if (eventMessage.type === 'wrong') {
				setWrongSignal(true);
				wrongNarrAudio.play().catch((error) => console.log('자동 재생 실패:', error));
				wrongNarrAudio.onended = () => {
					setIsWrong(false);
				};
			}
			if (eventMessage.type === 'narr') {
				narrAudio.play().catch((error) => console.log('자동 재생 실패:', error));
			}
		};

		// 소켓 닫히면
		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		const moveSocket = new WebSocket('wss://littleplanet.kids:17776');

		moveSocket.onopen = () => {
			console.log('WebSocket connection established.');

			const handShake = {
				type: 'HW',
				email: memberEmail,
			};
			moveSocket.send(JSON.stringify(handShake));
		};

		moveSocket.onmessage = (event) => {
			const eventMessage = JSON.parse(event.data);
			if (eventMessage.type === 'HW') {
				if (eventMessage.movedir === 'left') {
					handleLeft();
				} else if (eventMessage.movedir === 'right') {
					handleRight();
				}
			}
		};

		moveSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		coachAudio.play().catch((error) => console.log('자동 재생 실패:', error));
		coachAudio.onended = () => {
			setShowAlert(false);
			newSocket.send(JSON.stringify({ type: 'narr', content: 1 }));
		};

		// 컴포넌트 닫히면 소켓, 타이머 초기화
		return () => {
			newSocket.close();
			moveSocket.close();
			// clearTimeout(timer);
		};
	}, []);

	// 3.GPT
	// 만일 text가 바뀌면 gpt에 요청을 보내야 함. 그리고 text 바뀌면 화면에 띄울 시간 필요함 (글자 수에 맞춰서 애니메이션 타임 계산)

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
					content: `1. [GOAL] : The child should tell the firefighter that his or her friend was injured. 2. [FIREFIGHTER'S QUESTION] : 네, 119입니다. 무슨 일이시죠? 3. [CHILD'S ANSWER] : ${text} ## Use the output in the JSON format. ##`,
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
								content: 2,
							};
							socket?.send(JSON.stringify(message));
						} else {
							setIsWrong(true);
							setFail(true);
							setText('');
						}
					}
				} catch (error) {
					console.log(error);
				}
			}
		}

		handleAsyncOperations();
	}, [text]);

	// 4. 오답 가이드라인 alert 타이머 추가
	useEffect(() => {
		let alertTimer: any;

		if (isWrong) {
			alertTimer = setTimeout(() => {
				setWrongAlert(true);
				coachWrong.play().catch((error) => console.log('자동 재생 실패:', error));
				coachWrong.onended = () => {
					setTimeout(() => {
						socket?.send(JSON.stringify({ type: 'wrong' }));
					}, 3000);
				};
			}, 500);
		}

		return () => {
			if (alertTimer) clearTimeout(alertTimer);
		};
	}, [isWrong]);

	// const sendNextPageMessage = () => {
	// 	const message = {
	// 		type: 'page',
	// 		content: 2,
	// 	};
	// 	if (socket) {
	// 		socket.send(JSON.stringify(message));
	// 	}
	// };

	return fail ? (
		<WrongWrapper>
			{/* <Button onClick={sendNextPageMessage}>NEXT</Button> */}
			<div className="wrong-container">
				<Alert className="flex justify-center" variant="gradient" open={wrongAlert && !text}>
					<div className="flex flex-row items-center m-2">
						<img className="w-16 h-14 mr-2" src={coach} alt="하준이" />
						<Typography variant="h4" color="yellow">
							신고를 할 때엔 정확한 상황을 말해야 해. 이렇게 말해볼까?
						</Typography>
					</div>
					<div className="flex flex-row items-center m-2">
						<PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
						<Typography variant="h3">{answer}</Typography>
					</div>
				</Alert>
			</div>
			{wrongSignal && <SimulationChat chatNumber={text ? 2 : 3} text={text || '다시 한번 말해볼래요?'} />}
		</WrongWrapper>
	) : (
		<Scene1Wrapper>
			{showAlert ? (
				<div className="alert-container">
					<Alert>
						<div className="flex flex-row items-center">
							<img className="w-16 h-14 mr-2" src={coach} alt="하준이" />
							<Typography variant="h3">먼저 다친 친구가 있다는 사실을 소방관에게 알려야 해!</Typography>
						</div>
					</Alert>
				</div>
			) : (
				<SimulationChat chatNumber={text ? 2 : 1} text={text || '네, 119입니다. 무슨 일이세요?'} />
			)}
			<div style={{ position: 'absolute', left: `${left}px`, bottom: '25px', width: '640px', height: '480px' }}>
				<CharacterDisplay />
			</div>
		</Scene1Wrapper>
	);
}

export default Scene1page;
