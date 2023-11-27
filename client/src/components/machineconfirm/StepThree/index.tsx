import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import api from 'api';
import { useRecoilValue } from 'recoil';
import loadingImage from 'assets/images/livecam_loading.jpg';
import Button from 'components/common/Button';
import CamDisplay from 'components/CamDisplay';
import { Wrapper } from './style';
import CheckStep from '../atoms/CheckStep';
import { userEmail } from '../../../store/RecoilState';

interface IStepThreeProps {
	setStep: Dispatch<SetStateAction<number>>;
}

function StepThree(props: IStepThreeProps) {
	const { setStep } = props;
	const [activeStep, setActiveStep] = useState(3);
	const [isDone, setIsDone] = useState(false);
	const userMail = useRecoilValue(userEmail);

	const testClick = async () => {
		if (!isDone) {
			setStep(3);
			setActiveStep(4);
			await api.post('/member/command', {
				memberEmail: userMail,
				memberCommand: 'start',
			});
		}
	};

	useEffect(() => {
		if (activeStep === 3) {
			setIsDone(false);
		}
	}, [activeStep]);

	return (
		<Wrapper>
			<div>
				<CheckStep activeStep={activeStep} checkNum={1} message="학생 선택" />
				<CheckStep activeStep={activeStep} checkNum={2} message="캐릭터 선택" />
				<CheckStep activeStep={activeStep} checkNum={3} message="카메라 위치 확인" />
				<CheckStep activeStep={activeStep} checkNum={4} message="캐릭터 연동 확인" />
				<CheckStep activeStep={activeStep} checkNum={5} message="시작하기!" />
			</div>
			<div className="image-wrapper">
				{CamDisplay ? (
					<div className="loading">
						<CamDisplay />
					</div>
				) : (
					<img className="loading-image" src={loadingImage} alt="" />
				)}
			</div>
			<Button text="다음" handleClick={() => testClick()} />
		</Wrapper>
	);
}

export default StepThree;
