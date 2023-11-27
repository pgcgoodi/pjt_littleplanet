import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import CharacterDisplay from 'components/CharacterDisplay';
import { userEmail } from 'store/RecoilState';
import ShineLottie from 'components/Lottie/ShineLottie';
import PointRightLottie from 'components/Lottie/PointRightLottie';
import PointLeftLottie from 'components/Lottie/PointLeftLottie';
import { useRecoilValue } from 'recoil';
import { SeqTwoWrapper } from './style';

interface ISeqTwoProps {
	setStep: Dispatch<SetStateAction<number>>;
	setAddress: Dispatch<SetStateAction<string>>;
}

function SeqTwo(props: ISeqTwoProps) {
	document.body.style.overflow = 'hidden';

	const { setStep, setAddress } = props;

	const [socket, setSocket] = useState<WebSocket | null>(null);
	const memberEmail = useRecoilValue(userEmail);

	// 캐릭터 초기 위치세팅
	const [left, setLeft] = useState(500);
	const [rightHandX, setRightHandX] = useState(0);
	const [rightHandY, setRightHandY] = useState(0);
	const [leftHandX, setLeftHandX] = useState(0);
	const [leftHandY, setLeftHandY] = useState(0);
	let imgleft = 500;

	const [hwsocket, setHWSocket] = useState<WebSocket | null>(null);

	// 장소 위치 세팅
	const [littleplanetInfo, setLittleplanetInfo] = useState(false);
	const [buildingInfo, setBuildingInfo] = useState(false);

	const littlePlanet = () => {
		setLittleplanetInfo((prev) => !prev);

		const message = {
			type: 'address',
			content: '소행성로',
		};

		socket?.send(JSON.stringify(message));

		const timer = setTimeout(() => {
			setStep(2);
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	};

	const samsungBuilding = () => {
		setBuildingInfo((prev) => !prev);
		const message = {
			type: 'address',
			content: '삼성스토어',
		};
		socket?.send(JSON.stringify(message));

		setAddress(message.content);

		const timer = setTimeout(() => {
			setStep(2);
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	};

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
			console.log(event.data);
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
				console.log(rightHandX, rightHandY, leftHandX, leftHandY);
			}
		};

		moveSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		return () => {
			newSocket.close();
			moveSocket.close();
		};
	}, []);

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

	useEffect(() => {
		if (rightHandX >= 1100 && rightHandX <= 13000 && !littleplanetInfo) {
			littlePlanet();
		}
		if (leftHandX >= 1100 && leftHandX <= 1300 && !littleplanetInfo) {
			littlePlanet();
		}
		if (rightHandX >= 300 && rightHandX <= 500 && !buildingInfo) {
			samsungBuilding();
		}
		if (leftHandX >= 300 && leftHandX <= 500 && !buildingInfo) {
			samsungBuilding();
		}
	}, [rightHandX, rightHandY, leftHandX, leftHandY]);

	return (
		<SeqTwoWrapper>
			<div style={{ position: 'absolute', left: `${left}px`, bottom: '50px', width: '640px', height: '480px' }}>
				<CharacterDisplay />
			</div>
			<div style={{ position: 'absolute', top: '150px', left: '50px' }}>
				<ShineLottie />
			</div>
			<div style={{ position: 'absolute', top: '165px', left: '180px' }}>
				<PointRightLottie />
			</div>
			<div style={{ position: 'absolute', top: '350px', left: '1350px' }}>
				<ShineLottie />
			</div>
			<div style={{ position: 'absolute', top: '380px', left: '1260px' }}>
				<PointLeftLottie />
			</div>
			<div
				style={{
					position: 'absolute',
					left: `1100px`,
					bottom: '50px',
					width: '200px',
					height: '480px',
					backgroundColor: 'rgba( 255, 255, 255, 0 )',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: `300px`,
					bottom: '50px',
					width: '200px',
					height: '480px',
					backgroundColor: 'rgba( 255, 255, 255, 0 )',
				}}
			/>
			{littleplanetInfo && (
				<div className="alert-container">
					<Alert className="flex justify-center">
						<div className="flex flex-row items-center m-2">
							<InformationCircleIcon className="w-8 h-8 mr-2" color="yellow" />
							<Typography variant="h3">여기는 소행성로 203번이에요.</Typography>
						</div>
						<div className="flex justify-center">
							<Typography variant="h6">잘 기억해뒀다가 소방관에게 알려주세요!</Typography>
						</div>
					</Alert>
				</div>
			)}
			{buildingInfo && (
				<div className="alert-container">
					<Alert className="flex justify-center">
						<div className="flex flex-row items-center m-2">
							<InformationCircleIcon className="w-8 h-8 mr-2" color="yellow" />
							<Typography variant="h3">여기는 삼성스토어 소행성지점 근처에요.</Typography>
						</div>
						<div className="flex justify-center">
							<Typography variant="h6">잘 기억해뒀다가 소방관에게 알려주세요!</Typography>
						</div>
					</Alert>
				</div>
			)}
		</SeqTwoWrapper>
	);
}

export default SeqTwo;
