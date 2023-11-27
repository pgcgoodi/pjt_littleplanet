import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/Button';
import WindModal from 'components/common/Modal/WindModal';
import useMovePage from 'hooks/useMovePage';
// import { Alert } from '@material-tailwind/react';
import api from 'api';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userEmail, deviceStatus } from '../../../store/RecoilState';
import { Wrapper } from './style';

interface TimerProps {
	onTimerEnd: () => void;
}

export const Timer: React.FC<TimerProps> = memo(({ onTimerEnd }) => {
	const MINUTES_IN_MS = 3 * 60 * 1000;
	const INTERVAL = 1000;
	const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

	const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
	const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

	const handleTimerEnd = useCallback(() => {
		onTimerEnd();
	}, [onTimerEnd]);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - INTERVAL);
		}, INTERVAL);

		if (timeLeft <= 0) {
			clearInterval(timer);
			handleTimerEnd();
			setTimeLeft(MINUTES_IN_MS);
		}

		return () => {
			clearInterval(timer);
		};
	}, [timeLeft, handleTimerEnd]);

	return (
		<div>
			{minutes} : {second}
		</div>
	);
});

Timer.propTypes = {
	onTimerEnd: PropTypes.func.isRequired,
};

function OpenModal() {
	const [otpNum, setOtpNum] = useState('');
	const [isOpenModal, setIsOpenModal] = useState(false);
	// const [confirmOpen, setConfirmOpen] = React.useState(false);
	const [movepage] = useMovePage();
	const userMail = useRecoilValue(userEmail);
	const setDeviceStatus = useSetRecoilState(deviceStatus);

	async function getApiNumber() {
		await api
			.post('/member/otp')
			.then((res) => {
				setOtpNum(res.data.message);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	async function getApiConnected() {
		await api
			.post(`member/otp/connected?otp=${otpNum}`)
			.then(async (res) => {
				if (res.data.success === true) {
					console.log(res.data);

					await api.post('member/command', {
						memberEmail: userMail,
						memberCommand: 'ready',
					});
					setDeviceStatus(userMail);
					movepage('/machineconfirm');
				}
			})
			.catch((e) => {
				console.log(e.response.data);
				alert('기기확인에 실패했습니다.');
			});
	}

	const clickModal = () => {
		setIsOpenModal(true);
		getApiNumber();
	};

	const closeModal = () => {
		getApiConnected();
		setIsOpenModal(false);
	};

	const modalContent = (
		<div className="flex flex-col items-center">
			<p className="m-1" style={{ fontSize: '32px' }}>
				{otpNum}
			</p>
			<div className="m-1">
				<Timer onTimerEnd={clickModal} />
			</div>
			<div className="m-1">
				<Button text="확인" handleClick={() => getApiConnected()} />
			</div>
		</div>
	);

	return (
		<>
			<Wrapper>
				<div>
					<Button text="OTP 생성하기 ▶" handleClick={() => clickModal()} />
				</div>
			</Wrapper>
			<WindModal open={isOpenModal} handleClose={closeModal} title="OTP 번호" content={modalContent} />
		</>
	);
}

export default OpenModal;
