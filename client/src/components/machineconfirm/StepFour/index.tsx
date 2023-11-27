import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import loadingImage from 'assets/images/livecam_loading.jpg';
import Button from 'components/common/Button';
import CharacterDisplay from 'components/CharacterDisplay';
import CheckStep from '../atoms/CheckStep';
import { Wrapper } from './style';

interface IStepFourProps {
	setStep: Dispatch<SetStateAction<number>>;
}

function StepFour(props: IStepFourProps) {
	const { setStep } = props;
	const [activeStep, setActiveStep] = useState(4);
	const [isDone, setIsDone] = useState(false);

	const testClick = () => {
		if (!isDone) {
			setStep(4);
			setActiveStep(5);
		}
	};

	useEffect(() => {
		if (activeStep === 4) {
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
			<div className="cam-wrapper">
				{/* <img className="loading" src={loadingImage} alt="" /> */}
				{CharacterDisplay ? (
					<div className="image-wrapper">
						<CharacterDisplay />
					</div>
				) : (
					<img className="loading" src={loadingImage} alt="" />
				)}
			</div>
			<Button text="다음" handleClick={() => testClick()} />
		</Wrapper>
	);
}

export default StepFour;
