import React, { useEffect, useState } from 'react';
import MachineConfirmLayout from 'layouts/MachineConfirmLayout';
import StepOne from 'components/machineconfirm/StepOne';
import StepTwo from 'components/machineconfirm/StepTwo';
import StepThree from 'components/machineconfirm/StepThree';
import StepFour from 'components/machineconfirm/StepFour';
import StepFive from 'components/machineconfirm/StepFive';
import { Wrapper } from './style';

function MachineConfirmPage() {
	const [step, setStep] = useState(0);
	const [stepView, setStepView] = useState(<div />);

	useEffect(() => {
		switch (step) {
			case 0: {
				setStepView(<StepOne setStep={setStep} />);
				break;
			}
			case 1: {
				setStepView(<StepTwo setStep={setStep} />);
				break;
			}
			case 2: {
				setStepView(<StepThree setStep={setStep} />);
				break;
			}
			case 3: {
				setStepView(<StepFour setStep={setStep} />);
				break;
			}
			case 4: {
				setStepView(<StepFive setStep={setStep} />);
				break;
			}
			default: {
				setStepView(<div>잠시만 기다려주세요! 컨텐츠를 로딩중입니다.</div>);
				break;
			}
		}
	}, [step]);

	return (
		<Wrapper>
			<h1 className="title">시작하기 전 확인해주세요!</h1>
			<MachineConfirmLayout StepView={stepView} />
		</Wrapper>
	);
}

export default MachineConfirmPage;
