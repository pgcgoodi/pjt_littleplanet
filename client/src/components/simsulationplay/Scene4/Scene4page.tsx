import React, { useState, useEffect } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import { PhoneArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useRecoilValue } from 'recoil';
import { userEmail, studentName } from '../../../store/RecoilState';
import api from '../../../api';
import { Scene4Wrapper } from './style';
import { CallGPT } from '../gpt/gpt';
import SimulationChat from '../SimulationChat/index';
import CharacterDisplay from '../../CharacterDisplay/index';
import narr from '../../../assets/music/narr_4.mp3';
import wrongNarr from '../../../assets/music/narr_6.mp3';
import coach from '../../../assets/images/coach.png';
import coachNarr from '../../../assets/music/coach_4.mp3';

type Content = {
	contentsUrlName: string;
	contentsUrlAddress: string;
	contentsUrlType: number;
	contentsUrlNum: number;
};

// 이름 말하기.
function Scene4page() {
	document.body.style.overflow = 'hidden';

	const [narrAudio] = useState(new Audio(narr));
	const [wrongNarrAudio] = useState(new Audio(wrongNarr));
	const [coachAudio] = useState(new Audio(coachNarr));

	// 1.화면
	// asset 불러오기.
	const [contentsData, setContentsData] = useState<Content[]>([]);
	const fetchData = async () => {
		try {
			const contentsResponse = await api.get('/contents?type=11&num=4');
			setContentsData(contentsResponse.data);
			console.log(contentsData);
		} catch (e) {
			console.log(e);
		}
	};

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

	// 오답 시 alert 띄우고, 정답 script 보여주기.
	const [isWrong, setIsWrong] = useState(false);
	const answer = useRecoilValue(studentName);

	// 오답이라면 소방관과의 대화도 변경되어야 함.
	const [wrongSignal, setWrongSignal] = useState(false);

	// 처음 컴포넌트가 마운트되면,
	useEffect(() => {
		// asset 불러오고
		fetchData();

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
			console.log(event.data);
			const eventMessage = JSON.parse(event.data);
			// 타입 확인 후 setText
			if (eventMessage.type === 'text4') {
				setText(eventMessage.content);
			}
			if (eventMessage.type === 'wrong') {
				setWrongSignal(true);
				wrongNarrAudio.play().catch((error) => console.log('자동 재생 실패:', error));
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

		// 3초 타이머 설정해서 Alert

		coachAudio.play().catch((error) => console.log('자동 재생 실패:', error));

		coachAudio.onended = () => {
			setShowAlert(false);
			newSocket.send(JSON.stringify({ type: 'narr', content: 4 }));
		};

		// const timer = setTimeout(() => {
		// 	setShowAlert(false);
		// 	newSocket.send(JSON.stringify({ type: 'narr', content: 4 }));
		// }, 3000);

		// 컴포넌트 닫히면 소켓 닫기
		return () => {
			setSocket(newSocket);
			const endmessage = {
				type: 'end',
			};
			newSocket.send(JSON.stringify(endmessage));
			newSocket.close();
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
					content: `1. [GOAL] : The child must must explain to the firefighters about their identity(Child's name is ${answer}) in case the phone is disconnected. If the child's answer is not similar to the name, return false. 2. [FIREFIGHTER'S QUESTION] : 전화하고 있는 학생 이름을 말해줄래요? 3. [CHILD'S ANSWER] : ${text} ## Use the output in the JSON format. ##`,
				};

				const textLength = text.length;
				const animationTime = textLength * 0.05 * 1000 + 2000;
				console.log('여기 시간', animationTime);

				try {
					const [timerResult, isCorrect] = await Promise.all([
						handleTimer(animationTime), // 글자 수에 맞춰서 타이머 설정
						CallGPT(prompt), // CallGPT 호출
					]);

					if (timerResult) {
						if (isCorrect) {
							const message = {
								type: 'page',
								content: 5,
							};
							const endmessage = {
								type: 'end',
							};
							socket?.send(JSON.stringify(message));
							socket?.send(JSON.stringify(endmessage));
						} else {
							setIsWrong(true);
							setText('');
							setTimeout(() => {
								socket?.send(JSON.stringify({ type: 'wrong' }));
							}, 3000);
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
	// 		content: 5,
	// 	};
	// 	if (socket) {
	// 		socket.send(JSON.stringify(message));
	// 	}
	// };

	return (
		<Scene4Wrapper>
			{/* <Button onClick={sendNextPageMessage}>NEXT</Button> */}
			{showAlert && (
				<div className="alert-container">
					<Alert>
						<div className="flex flex-row items-center">
							<img className="w-16 h-14 mr-2" src={coach} alt="하준이" />
							<Typography variant="h3">이제 마지막이야! 네 이름을 알려줘!</Typography>
						</div>
					</Alert>
				</div>
			)}
			{!showAlert && !isWrong && !wrongSignal && (
				<SimulationChat chatNumber={text ? 2 : 1} text={text || '전화하고 있는 친구 이름을 말해줄래요?'} />
			)}
			{isWrong && (
				<div className="wrong-container">
					<Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
						<div className="flex flex-row m-3">
							<SparklesIcon className="w-10 h-10 mr-2" color="yellow" />
							<Typography variant="h3">이렇게 말해볼까?</Typography>
						</div>
						<div className="flex flex-row items-center">
							<PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
							<Typography variant="h5">저는 {answer}입니다.</Typography>
						</div>
					</Alert>
				</div>
			)}
			{!showAlert && !isWrong && wrongSignal && (
				<SimulationChat chatNumber={text ? 2 : 1} text={text || '다시 한번 얘기해볼래요?'} />
			)}
			<div style={{ position: 'absolute', left: `${left}px`, bottom: '50px', width: '640px', height: '480px' }}>
				<CharacterDisplay />
			</div>
		</Scene4Wrapper>
	);
}

export default Scene4page;
