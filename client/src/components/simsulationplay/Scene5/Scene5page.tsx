import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Typography } from '@material-tailwind/react';
import { useRecoilValue } from 'recoil';
import EndingModal from '../EndingModal/EndingModal';
import { studentName } from '../../../store/RecoilState';
import { Scene5Wrapper, Bg2Wrapper } from './style';
import SimulationChat from '../SimulationChat/index';
import outroSound from '../../../assets/music/outro_sound.mp3';
import outroSound2 from '../../../assets/music/outro_sound2.mp3';
import outroSound3 from '../../../assets/music/outro_sound3.mp3';
import outroSound4 from '../../../assets/music/outro_sound4.mp3';
import outroVoice from '../../../assets/music/outro_voice.mp3';
import edMusic from '../../../assets/music/ending_music.mp3';
import coach from '../../../assets/images/coach.png';

function Scene5Page() {
	document.body.style.overflow = 'hidden';
	// 구급차 소리
	const [outroAudio] = useState(new Audio(outroSound));
	// 구급차가 도착했어, 하준이 음성
	const [outroAudio2] = useState(new Audio(outroSound2));
	// 119행성탐험을 성공적으로 해냈어, 하준이음성
	const [outroAudio3] = useState(new Audio(outroSound3));
	// 다음 행성 탐험을 떠나볼까?, 하준이 음성
	const [outroAudio4] = useState(new Audio(outroSound4));
	// TTS 음성
	const [outrovoiceAudio] = useState(new Audio(outroVoice));
	// 엔딩 음악
	const [edAudio] = useState(new Audio(edMusic));
	// SimulationChat 컴포넌트 표시 여부를 제어하는 상태
	const [showSimulationChat, setShowSimulationChat] = useState(false);
	const [showEndingCredit, setshowEndingCredit] = useState(false);
	const [showBg2Wrapper, setShowBg2Wrapper] = useState(false);
	const [showEndingModal, setShowEndingModal] = useState(false);

	const studentname = useRecoilValue(studentName);
	// 구급차 소리 재생 후 outroSound2(하준이목소리) 재생
	const playOutroSound4 = () => {
		outroAudio4.play().catch((error) => console.log('자동 재생 실패:', error));
		outroAudio4.onended = () => {
			setShowEndingModal(true); // 모달 열기
		};
	};
	// 구급차 소리 재생 후 outroSound2(하준이목소리) 재생
	const playOutroSound3 = () => {
		outroAudio3.play().catch((error) => console.log('자동 재생 실패:', error));
		outroAudio3.onended = playOutroSound4;
	};

	const playEdMusic = () => {
		setShowSimulationChat(false);
		setshowEndingCredit(true);
		edAudio.volume = 0.3;
		edAudio.play().catch((error) => console.log('자동 재생 실패:', error));
		edAudio.onended = () => {
			edAudio.pause();
			edAudio.currentTime = 0;
			playOutroSound3();
		};
	};
	const convertToSpeech = async (name: string) => {
		try {
			const apiKey = process.env.REACT_APP_GOOGLE_CLOUD_TTS_API_KEY;
			const response = await axios.post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
				input: { text: `${name}친구야, 고마워! 덕분에 아픈 친구를 무사히 구조할 수 있었어!` },
				voice: { languageCode: 'ko-KR', name: 'ko-KR-Standard-D', ssmlGender: 'MALE' },
				audioConfig: { audioEncoding: 'MP3' },
			});
			// console.log('응답 데이터', response.data); // 응답 데이터 확인
			// base64 인코딩된 문자열을 디코딩하고 Uint8Array로 변환
			const audioStr = atob(response.data.audioContent);
			// console.log('디코딩된 문자열', audioStr);
			const audioBytes = new Uint8Array(audioStr.length);
			for (let i = 0; i < audioStr.length; i += 1) {
				audioBytes[i] = audioStr.charCodeAt(i);
			}
			// console.log('변환된바이트배열', audioBytes);
			const audioBlob = new Blob([audioBytes], { type: 'audio/mp3' });
			const audioURL = URL.createObjectURL(audioBlob);
			// TTS 음성 재생
			const ttsAudio = new Audio(audioURL);
			ttsAudio.play();
			setShowSimulationChat(true);
			ttsAudio.onended = () => {
				playEdMusic();
			};
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const handleTTS = async () => {
		await convertToSpeech(studentname);
	};

	const playOutroVoiceOrTTS = () => {
		if (studentname === '조찬익') {
			outrovoiceAudio.play().catch((error) => console.log('자동 재생 실패:', error));
			setShowSimulationChat(true);
			outrovoiceAudio.onended = playEdMusic;
		} else {
			handleTTS();
		}
	};
	// outroSound2(하준이목소리) 재생 후 playOutroVoiceOrTTS 실행
	const playOutroSound2 = () => {
		outroAudio2.play().catch((error) => console.log('자동 재생 실패:', error));
		outroAudio2.onended = () => {
			setShowBg2Wrapper(true); // 배경 변경
			playOutroVoiceOrTTS();
		};
	};
	// 구급차 소리 재생 후 outroSound2(하준이목소리) 재생
	const playOutroSound = () => {
		outroAudio.play().catch((error) => console.log('자동 재생 실패:', error));
		outroAudio.onended = playOutroSound2;
	};

	useEffect(() => {
		playOutroSound(); // 첫 번째 구급차사운드 재생
	}, []);

	return (
		<div>
			{!showBg2Wrapper ? (
				// 소방차가 도착하는 배경
				<Scene5Wrapper>
					<Alert>
						<div className="flex flex-row items-center">
							<img className="w-16 h-14 mr-2" src={coach} alt="하준이" />
							<Typography variant="h3">구급차가 도착했어!</Typography>
						</div>
					</Alert>
				</Scene5Wrapper>
			) : (
				// 소방관이 칭찬하는 배경
				<Bg2Wrapper>
					{/* <Button className="btn-style" onClick={handleTTS}>
						TTS음성
					</Button> */}
					{showSimulationChat && (
						<SimulationChat
							chatNumber={3}
							text={`${studentname} 친구야, 고마워! 덕분에 아픈 친구를 무사히 구조할 수 있었어!`}
						/>
					)}
					{showEndingCredit && (
						<div className="marquee" style={{ borderRadius: 5 }}>
							<Typography variant="h3" className="text-center">
								119 신고 시뮬레이션이 성공적으로 완료되었습니다!
							</Typography>
							<br />
							<Typography variant="h5" className="text-center">
								DIRECTOR : 소행성 C203
							</Typography>
							<br />
							<Typography variant="h4" className="text-center">
								CAST
							</Typography>
							<br />
							<Typography variant="h5" className="text-center">
								출연 : {studentname}{' '}
							</Typography>
							<br />
							<Typography variant="h5" className="text-center">
								소행성과 함께 해주셔서 감사합니다.
							</Typography>
							<br />
							<Typography variant="h5" className="text-center">
								다음 행성 탐험도 기대해주세요!
							</Typography>
							<br />
							<Typography variant="h2" className="text-center">
								TO BE CONTINUED...
							</Typography>
							<br />
						</div>
					)}
					{showEndingModal && <EndingModal isOpen={showEndingModal} onClose={() => setShowEndingModal(false)} />}
				</Bg2Wrapper>
			)}
		</div>
	);
}

export default Scene5Page;
