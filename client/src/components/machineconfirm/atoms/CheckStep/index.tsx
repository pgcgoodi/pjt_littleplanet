import React, { ReactNode } from 'react';
import { CheckStepWrapper } from './style';

interface ICheckStepProps {
	checkNum: number;
	message: string;
	activeStep: ReactNode;
}

function CheckStep(props: ICheckStepProps) {
	const { checkNum, message, activeStep } = props;
	return (
		<CheckStepWrapper>
			<div className="circle">{checkNum}</div>
			<div className={checkNum === activeStep ? 'active message' : 'message'}>{message}</div>
		</CheckStepWrapper>
	);
}

export default CheckStep;
